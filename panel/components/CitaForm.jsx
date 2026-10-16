import { useEffect, useState } from 'react';
import { supabase, mensajeError, normalizarTelefono, telefonoValido, formatoTelefono } from '../supabase';
import { fechaHora, horariosLibres, hoyLima, rangoDia, ESTADOS_ACTIVOS } from '../../shared/agenda.js';
import { fechaCorta, fechaDe, horaDe } from '../formato';
import Modal from './Modal';
import ServicioPicker from './ServicioPicker';

// Crear una cita nueva (`inicial`) o reprogramar una existente (`cita`)
export default function CitaForm({ cita, inicial, onCerrar, onGuardada }) {
  const editando = Boolean(cita);
  const [servicios, setServicios] = useState([]);
  const [horario, setHorario] = useState([]);
  const [f, setF] = useState(() => (editando
    ? { nombre: cita.clientes?.nombre ?? '', telefono: formatoTelefono(cita.clientes?.telefono ?? ''), servicio: cita.servicio_id,
        fecha: fechaDe(cita.inicio), hora: horaDe(cita.inicio), notas: cita.notas ?? '' }
    : { nombre: '', telefono: '', servicio: null, fecha: inicial.fecha, hora: inicial.hora ?? '', notas: '' }));
  const [libres, setLibres] = useState([]);
  const [error, setError] = useState('');
  const [guardando, setGuardando] = useState(false);

  const set = (k) => (e) => setF((v) => ({ ...v, [k]: e.target.value }));
  const servicio = servicios.find((s) => s.id === f.servicio);

  useEffect(() => {
    Promise.all([
      supabase.from('servicios').select('id, categoria, nombre, precio, duracion_min, activo').order('orden'),
      supabase.from('horario').select('dia, abre, cierra')
    ]).then(([s, h]) => {
      // Los inactivos no se ofrecen, salvo el que ya tiene la cita que se reprograma
      setServicios((s.data ?? []).filter((x) => x.activo || x.id === cita?.servicio_id));
      setHorario(h.data ?? []);
      if (s.error || h.error) setError(mensajeError(s.error || h.error));
    });
  }, [cita?.servicio_id]);

  // Horarios libres del día para el servicio elegido (sin contar la cita que se reprograma)
  useEffect(() => {
    if (!servicio || !f.fecha) { setLibres([]); return; }
    const { desde, hasta } = rangoDia(f.fecha);
    let citas = supabase.from('citas').select('inicio, fin').in('estado', ESTADOS_ACTIVOS).lt('inicio', hasta).gt('fin', desde);
    if (editando) citas = citas.neq('id', cita.id);
    let vivo = true;
    Promise.all([citas, supabase.from('bloqueos').select('inicio, fin').lt('inicio', hasta).gt('fin', desde)])
      .then(([c, b]) => {
        if (vivo) setLibres(horariosLibres({ fecha: f.fecha, duracion: servicio.duracion_min, horario, ocupados: [...(c.data ?? []), ...(b.data ?? [])] }));
      });
    return () => { vivo = false; };
  }, [servicio, f.fecha, horario, editando, cita?.id]);

  const guardar = async (e) => {
    e.preventDefault();
    setError('');
    const telefono = normalizarTelefono(f.telefono);
    if (!telefonoValido(telefono)) { setError('Revisa el celular: 9 dígitos que empiecen con 9 (ej. 987 654 321), o el número completo con código de país.'); return; }
    if (!servicio) { setError('Elige un servicio.'); return; }
    if (!f.hora) { setError('Elige una hora.'); return; }
    setGuardando(true);
    const { data: cliente, error: e1 } = await supabase.from('clientes')
      .upsert({ telefono, nombre: f.nombre.trim() || null }, { onConflict: 'telefono' })
      .select('id').single();
    if (e1) { setError(mensajeError(e1)); setGuardando(false); return; }

    const inicio = fechaHora(f.fecha, f.hora);
    const fin = new Date(inicio.getTime() + servicio.duracion_min * 60000);
    const datos = {
      cliente_id: cliente.id, servicio_id: servicio.id,
      inicio: inicio.toISOString(), fin: fin.toISOString(), notas: f.notas.trim() || null
    };
    const { error: e2 } = editando
      // Al reprogramar, una cita cancelada, atendida o "no asistió" vuelve a quedar confirmada
      ? await supabase.from('citas').update({
          ...datos, recordatorio_enviado: false,
          estado: cita.estado === 'pendiente' ? 'pendiente' : 'confirmada'
        }).eq('id', cita.id)
      : await supabase.from('citas').insert({ ...datos, estado: 'confirmada', origen: 'panel' });
    setGuardando(false);
    if (e2) setError(mensajeError(e2)); else onGuardada(f.fecha);
  };

  return (
    <Modal titulo={editando ? <>Reprogramar <em>cita</em></> : <>Nueva <em>cita</em></>} onCerrar={onCerrar}>
      <form onSubmit={guardar}>
        {editando && (
          <p className="aviso">Antes: <b>{fechaCorta(fechaDe(cita.inicio))} · {horaDe(cita.inicio)}</b>. Elige la nueva fecha y hora.</p>
        )}
        <div className="grid-2">
          <label>Nombre<input value={f.nombre} onChange={set('nombre')} autoFocus={!editando} /></label>
          <label>Celular / WhatsApp<input value={f.telefono} onChange={set('telefono')} inputMode="tel" placeholder="987 654 321" required /></label>
        </div>

        <p className="etiqueta">Servicio</p>
        <ServicioPicker servicios={servicios} valor={f.servicio} onElegir={(id) => setF((v) => ({ ...v, servicio: id }))} />

        <div className="grid-2">
          <label>Fecha<input type="date" value={f.fecha} onChange={set('fecha')} required /></label>
          <label>Hora<input type="time" step="900" value={f.hora} onChange={set('hora')} required /></label>
        </div>
        {f.fecha && f.fecha < hoyLima() && <p className="aviso">Ojo: esta fecha ya pasó.</p>}
        {servicio && (
          <div className="libres">
            <small>Horarios libres ese día ({servicio.duracion_min} min):</small>
            {libres.length ? libres.map((h) => (
              <button type="button" key={h} className={`slot${f.hora === h ? ' on' : ''}`} aria-pressed={f.hora === h}
                onClick={() => setF((v) => ({ ...v, hora: h }))}>{h}</button>
            )) : <small className="muted">Ninguno según el horario. Puedes poner la hora a mano.</small>}
          </div>
        )}
        <label>Notas<textarea rows="2" value={f.notas} onChange={set('notas')} /></label>
        {error && <p className="error" role="alert">{error}</p>}
        <div className="modal-pie">
          <button type="button" className="btn btn-ghost" onClick={onCerrar}>Cancelar</button>
          <button className="btn btn-primary" disabled={guardando}>{guardando ? 'Guardando…' : editando ? 'Guardar cambios' : 'Guardar cita'}</button>
        </div>
      </form>
    </Modal>
  );
}
