// Pruebas de la cola de avisos con una base de datos falsa (no envía nada real)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { decidir, procesarAvisos, programarRecordatorios } from '../avisos.js';

const futuro = (h) => new Date(Date.now() + h * 3600e3).toISOString();
const aviso = (id, tipo, cita) => ({ id, tipo, citas: cita });
const cita = (o = {}) => ({ id: 1, inicio: futuro(30), estado: 'confirmada', clientes: { nombre: 'María Torres', telefono: '51987654321' }, servicios: { nombre: 'Vitamina C' }, ...o });

// Base de datos falsa: devuelve `filas` en los select y anota los update/insert
function dbFalsa(filas) {
  const cambios = [];
  const consulta = (tabla) => {
    const q = {
      select: () => q, is: () => q, in: () => q, gte: () => q, lte: () => q, order: () => q, limit: () => q,
      eq: (col, val) => { if (q._cambio) { cambios.push({ tabla, ...q._cambio, [col]: val }); } return q; },
      update: (datos) => { q._cambio = { accion: 'update', datos }; return q; },
      insert: (datos) => { cambios.push({ tabla, accion: 'insert', datos }); return Promise.resolve({ error: null }); },
      then: (ok) => ok({ data: filas[tabla] ?? [], error: null })
    };
    return q;
  };
  return { from: consulta, cambios };
}

test('decidir: cita confirmada futura → mensaje con nombre, servicio y dirección', () => {
  const d = decidir(aviso(1, 'reprogramacion', cita()));
  assert.equal(d.telefono, '51987654321');
  assert.match(d.texto, /Hola María, tu cita en Natural Skin fue reprogramada/);
  assert.match(d.texto, /Vitamina C/);
  assert.match(d.texto, /Av\. José Pardo 1101/);
});

test('decidir: omite canceladas, pasadas, sin cita y números fuera del modo prueba', () => {
  assert.match(decidir(aviso(1, 'confirmacion', cita({ estado: 'cancelada' }))).omitir, /cancelada/);
  assert.match(decidir(aviso(1, 'confirmacion', cita({ inicio: futuro(-1) }))).omitir, /ya pasó/);
  assert.match(decidir(aviso(1, 'confirmacion', null)).omitir, /no existe/);
  assert.match(decidir(aviso(1, 'confirmacion', cita()), { soloNumeros: ['51911111111'] }).omitir, /modo prueba/);
  assert.equal(decidir(aviso(1, 'confirmacion', cita()), { soloNumeros: ['51987654321'] }).telefono, '51987654321');
});

test('procesarAvisos: envía, marca enviados, registra errores y omisiones', async () => {
  const db = dbFalsa({ avisos: [
    aviso(1, 'reprogramacion', cita()),
    aviso(2, 'confirmacion', cita({ estado: 'cancelada' })),
    aviso(3, 'recordatorio', cita({ clientes: { nombre: 'Ana', telefono: '51900000000' } }))
  ] });
  const enviados = [];
  const enviar = async (tel, texto) => {
    if (tel === '51900000000') throw new Error('Ese número no tiene WhatsApp');
    enviados.push({ tel, texto });
  };
  const n = await procesarAvisos({ db, enviar, pausaMs: () => 0, log: () => {} });

  assert.equal(n, 1);
  assert.equal(enviados.length, 1);
  assert.equal(enviados[0].tel, '51987654321');
  const porId = Object.fromEntries(db.cambios.map((c) => [c.id, c.datos]));
  assert.equal(porId[1].via, 'bot');
  assert.ok(porId[1].enviado_en);
  assert.match(porId[2].error, /Omitido: la cita está cancelada/);
  assert.equal(porId[3].error, 'Ese número no tiene WhatsApp');
});

test('programarRecordatorios: solo encola las reservadas con tiempo y respeta el horario', async () => {
  const mediodiaLima = new Date('2026-10-19T17:00:00Z'); // 12:00 p. m. en Lima
  const db = dbFalsa({ citas: [
    { id: 7, inicio: '2026-10-20T15:00:00Z', creado_en: '2026-10-10T15:00:00Z' }, // reservada hace días → recordatorio
    { id: 8, inicio: '2026-10-20T15:00:00Z', creado_en: '2026-10-20T10:00:00Z' }  // reservada 5 h antes → sin recordatorio
  ] });
  const n = await programarRecordatorios({ db, ahora: mediodiaLima, log: () => {} });
  assert.equal(n, 1);
  assert.deepEqual(db.cambios.filter((c) => c.accion === 'insert').map((c) => c.datos), [{ cita_id: 7, tipo: 'recordatorio' }]);
  assert.equal(db.cambios.filter((c) => c.tabla === 'citas').length, 2); // ambas quedan marcadas

  const noche = new Date('2026-10-20T03:00:00Z'); // 10:00 p. m. en Lima
  assert.equal(await programarRecordatorios({ db: dbFalsa({ citas: [{ id: 9 }] }), ahora: noche }), 0);
});
