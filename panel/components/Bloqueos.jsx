import { useCallback, useEffect, useState } from 'react';
import { supabase, mensajeError } from '../supabase';
import { enLima, fechaHora, hoyLima } from '../../shared/agenda.js';

const formato = (iso) => { const { fecha, hora } = enLima(new Date(iso)); return `${fecha.split('-').reverse().join('/')} ${hora}`; };

export default function Bloqueos() {
  const [bloqueos, setBloqueos] = useState([]);
  const [f, setF] = useState({ desdeF: hoyLima(), desdeH: '09:00', hastaF: hoyLima(), hastaH: '19:00', motivo: '' });
  const [error, setError] = useState('');
  const set = (k) => (e) => setF((v) => ({ ...v, [k]: e.target.value }));

  const cargar = useCallback(async () => {
    const { data, error } = await supabase.from('bloqueos').select('*')
      .gte('fin', new Date().toISOString()).order('inicio');
    setBloqueos(data ?? []);
    if (error) setError(mensajeError(error));
  }, []);
  useEffect(() => { cargar(); }, [cargar]);

  const agregar = async (e) => {
    e.preventDefault();
    const inicio = fechaHora(f.desdeF, f.desdeH), fin = fechaHora(f.hastaF, f.hastaH);
    if (fin <= inicio) { setError('El fin debe ser después del inicio.'); return; }
    const { error } = await supabase.from('bloqueos').insert({ inicio: inicio.toISOString(), fin: fin.toISOString(), motivo: f.motivo.trim() || null });
    if (error) setError(mensajeError(error)); else { setError(''); setF((v) => ({ ...v, motivo: '' })); cargar(); }
  };

  const borrar = async (id) => {
    const { error } = await supabase.from('bloqueos').delete().eq('id', id);
    if (error) setError(mensajeError(error)); else cargar();
  };

  return (
    <section>
      <h2 className="titulo">Bloquear <em>horarios</em></h2>
      <p className="muted">Vacaciones, feriados o ratos en que no se atiende. El bot no ofrecerá esas horas.</p>
      <form className="card bloqueo-form" onSubmit={agregar}>
        <div className="grid-2">
          <label>Desde<span className="par"><input type="date" value={f.desdeF} onChange={set('desdeF')} required /><input type="time" value={f.desdeH} onChange={set('desdeH')} required /></span></label>
          <label>Hasta<span className="par"><input type="date" value={f.hastaF} onChange={set('hastaF')} required /><input type="time" value={f.hastaH} onChange={set('hastaH')} required /></span></label>
        </div>
        <label>Motivo<input value={f.motivo} onChange={set('motivo')} placeholder="Ej. feriado" /></label>
        {error && <p className="error" role="alert">{error}</p>}
        <button className="btn btn-primary">Agregar bloqueo</button>
      </form>
      {bloqueos.length === 0 ? <p className="vacio">No hay bloqueos próximos.</p> : (
        <ul className="citas">
          {bloqueos.map((b) => (
            <li key={b.id} className="cita">
              <div className="cita-info"><strong>{formato(b.inicio)} → {formato(b.fin)}</strong><span>{b.motivo || 'Sin motivo'}</span></div>
              <div className="cita-acciones"><button className="btn btn-ghost btn-sm" onClick={() => borrar(b.id)}>Quitar</button></div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
