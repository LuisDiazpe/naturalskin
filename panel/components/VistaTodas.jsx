import { useEffect, useState } from 'react';
import { supabase, mensajeError, formatoTelefono, SELECT_CITA } from '../supabase';
import { hoyLima } from '../../shared/agenda.js';
import { ESTADOS, INACTIVOS, fechaCorta, fechaDe, fechaNumerica, horaDe, normalizar, soles } from '../formato';
import { IconoDescarga } from './Iconos';

// Evita que Excel interprete un texto como fórmula (=, +, -, @)
const celda = (v) => {
  const s = String(v ?? '');
  return `"${(/^[=+\-@]/.test(s) ? `'${s}` : s).replace(/"/g, '""')}"`;
};

function descargarExcel(citas) {
  const filas = [
    ['Fecha', 'Inicio', 'Fin', 'Clienta', 'Celular', 'Servicio', 'Precio (S/)', 'Estado', 'Origen', 'Notas'],
    ...citas.map((c) => [
      fechaNumerica(fechaDe(c.inicio)), horaDe(c.inicio), horaDe(c.fin),
      c.clientes?.nombre, c.clientes?.telefono, c.servicios?.nombre, c.servicios?.precio,
      ESTADOS[c.estado], c.origen === 'bot' ? 'Bot' : 'Panel', c.notas
    ])
  ];
  // Separador ";" y BOM para que Excel en español lo abra con columnas y tildes correctas
  const csv = '﻿' + filas.map((f) => f.map(celda).join(';')).join('\r\n');
  const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }));
  const a = document.createElement('a');
  a.href = url;
  a.download = `citas-natural-skin-${hoyLima()}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

export default function VistaTodas({ rev, onAbrir }) {
  const [rango, setRango] = useState('proximas');
  const [estado, setEstado] = useState('todos');
  const [q, setQ] = useState('');
  const [citas, setCitas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let vivo = true;
    const ahora = new Date().toISOString();
    let consulta = supabase.from('citas').select(SELECT_CITA).limit(2000);
    if (rango === 'proximas') consulta = consulta.gte('inicio', ahora).order('inicio');
    else if (rango === 'pasadas') consulta = consulta.lt('inicio', ahora).order('inicio', { ascending: false });
    else consulta = consulta.order('inicio', { ascending: false });
    if (estado !== 'todos') consulta = consulta.eq('estado', estado);
    setCargando(true);
    consulta.then(({ data, error }) => {
      if (!vivo) return;
      setCitas(data ?? []);
      setError(error ? mensajeError(error) : '');
      setCargando(false);
    });
    return () => { vivo = false; };
  }, [rango, estado, rev]);

  const filtradas = q
    ? citas.filter((c) => normalizar(`${c.clientes?.nombre} ${c.clientes?.telefono} ${c.servicios?.nombre} ${c.notas}`).includes(normalizar(q)))
    : citas;
  const total = filtradas.filter((c) => !INACTIVOS.includes(c.estado)).reduce((s, c) => s + Number(c.servicios?.precio ?? 0), 0);

  return (
    <section>
      <div className="filtros">
        <input type="search" placeholder="Buscar por nombre, celular o servicio…" value={q} onChange={(e) => setQ(e.target.value)} aria-label="Buscar" />
        <select value={rango} onChange={(e) => setRango(e.target.value)} aria-label="Rango de fechas">
          <option value="proximas">Próximas</option>
          <option value="pasadas">Pasadas</option>
          <option value="todas">Todas las fechas</option>
        </select>
        <select value={estado} onChange={(e) => setEstado(e.target.value)} aria-label="Estado">
          <option value="todos">Todos los estados</option>
          {Object.entries(ESTADOS).map(([v, l]) => <option key={v} value={v}>{l}</option>)}
        </select>
        <button type="button" className="btn btn-ghost btn-sm" onClick={() => descargarExcel(filtradas)} disabled={!filtradas.length}>
          <IconoDescarga />Descargar Excel
        </button>
      </div>
      <p className="resumen">
        {cargando ? 'Cargando…' : <>{filtradas.length} cita{filtradas.length === 1 ? '' : 's'} · Total estimado <b>{soles(total)}</b> <span className="muted">(sin canceladas ni "no asistió")</span></>}
      </p>
      {error && <p className="error" role="alert">{error}</p>}

      <div className="tabla-wrap">
        <table className="tabla tabla-citas">
          <thead>
            <tr><th>Fecha</th><th>Hora</th><th>Clienta</th><th>Celular</th><th>Servicio</th><th>Precio</th><th>Estado</th><th>Origen</th></tr>
          </thead>
          <tbody>
            {!cargando && filtradas.length === 0 && <tr><td colSpan="8" className="vacio">No hay citas con estos filtros.</td></tr>}
            {filtradas.map((c) => (
              <tr key={c.id} onClick={() => onAbrir(c)} className={`fila estado-${c.estado}`}>
                <td><button type="button" className="link-fila" onClick={(e) => { e.stopPropagation(); onAbrir(c); }}>{fechaCorta(fechaDe(c.inicio))}</button></td>
                <td>{horaDe(c.inicio)}–{horaDe(c.fin)}</td>
                <td>{c.clientes?.nombre || 'Sin nombre'}</td>
                <td className="nowrap">{formatoTelefono(c.clientes?.telefono)}</td>
                <td>{c.servicios?.nombre}</td>
                <td className="nowrap">{soles(c.servicios?.precio)}</td>
                <td><span className={`badge estado-${c.estado}`}>{ESTADOS[c.estado]}</span></td>
                <td>{c.origen === 'bot' ? 'Bot' : 'Panel'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
