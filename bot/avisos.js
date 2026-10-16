// Cola de avisos: el panel y la base de datos los crean, el bot los envía por WhatsApp.
import { mensajeCita } from '../shared/mensajes.js';
import { enLima } from '../shared/agenda.js';

const ACTIVOS = ['pendiente', 'confirmada'];

// Decide qué hacer con un aviso, sin efectos: { omitir: motivo } o { telefono, texto }
export function decidir(aviso, { ahora = new Date(), soloNumeros = [] } = {}) {
  const cita = aviso.citas;
  if (!cita) return { omitir: 'la cita ya no existe' };
  if (!ACTIVOS.includes(cita.estado)) return { omitir: `la cita está ${cita.estado.replace('_', ' ')}` };
  if (new Date(cita.inicio) <= ahora) return { omitir: 'la cita ya pasó' };
  const telefono = cita.clientes?.telefono;
  if (!telefono) return { omitir: 'la clienta no tiene celular' };
  if (soloNumeros.length && !soloNumeros.includes(telefono)) return { omitir: 'modo prueba: número no autorizado' };
  return {
    telefono,
    texto: mensajeCita(aviso.tipo, { nombre: cita.clientes?.nombre, servicio: cita.servicios?.nombre, inicio: cita.inicio })
  };
}

const esperar = (ms) => new Promise((r) => setTimeout(r, ms));

// Envía los avisos pendientes (los que tienen error no se reintentan solos: se reintentan desde el panel)
export async function procesarAvisos({ db, enviar, soloNumeros = [], pausaMs = () => 2000 + Math.random() * 2000, log = console.log }) {
  const { data: avisos, error } = await db.from('avisos')
    .select('id, tipo, citas(id, inicio, estado, clientes(nombre, telefono), servicios(nombre))')
    .is('enviado_en', null).is('error', null)
    .order('creado_en').limit(20);
  if (error) throw new Error(`No se pudo leer la cola de avisos: ${error.message}`);

  let enviados = 0;
  for (const aviso of avisos ?? []) {
    const d = decidir(aviso, { soloNumeros });
    if (d.omitir) {
      await db.from('avisos').update({ error: `Omitido: ${d.omitir}` }).eq('id', aviso.id);
      log(`– Aviso ${aviso.id} (${aviso.tipo}) omitido: ${d.omitir}`);
      continue;
    }
    try {
      await enviar(d.telefono, d.texto);
      await db.from('avisos').update({ enviado_en: new Date().toISOString(), via: 'bot', error: null }).eq('id', aviso.id);
      enviados++;
      log(`✓ Aviso ${aviso.id} (${aviso.tipo}) enviado a ${d.telefono}`);
    } catch (e) {
      await db.from('avisos').update({ error: e.message }).eq('id', aviso.id);
      log(`✗ Aviso ${aviso.id} (${aviso.tipo}) falló: ${e.message}`);
    }
    await esperar(pausaMs()); // pausa entre mensajes para no parecer spam
  }
  return enviados;
}

// Encola recordatorios para las citas de las próximas 24 h (solo de 8 a. m. a 8 p. m., hora de Lima)
export async function programarRecordatorios({ db, ahora = new Date(), log = console.log }) {
  const hora = Number(enLima(ahora).hora.slice(0, 2));
  if (hora < 8 || hora >= 20) return 0;
  const desde = new Date(ahora.getTime() + 2 * 3600e3).toISOString();
  const hasta = new Date(ahora.getTime() + 24 * 3600e3).toISOString();
  const { data: citas, error } = await db.from('citas')
    .select('id, inicio, creado_en')
    .in('estado', ACTIVOS).eq('recordatorio_enviado', false)
    .gte('inicio', desde).lte('inicio', hasta);
  if (error) throw new Error(`No se pudieron leer las citas: ${error.message}`);

  let n = 0;
  for (const c of citas ?? []) {
    // Si la reservaron hace poco (menos de 12 h antes de la cita), la confirmación ya basta
    const reservadaConTiempo = new Date(c.inicio) - new Date(c.creado_en) >= 12 * 3600e3;
    if (reservadaConTiempo) {
      await db.from('avisos').insert({ cita_id: c.id, tipo: 'recordatorio' });
      n++;
    }
    await db.from('citas').update({ recordatorio_enviado: true }).eq('id', c.id);
  }
  if (n) log(`⏰ ${n} recordatorio(s) en cola`);
  return n;
}
