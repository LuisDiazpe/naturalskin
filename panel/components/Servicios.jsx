import { useEffect, useState } from 'react';
import { supabase, mensajeError } from '../supabase';

export default function Servicios() {
  const [servicios, setServicios] = useState([]);
  const [error, setError] = useState('');
  const [guardado, setGuardado] = useState(null);

  useEffect(() => {
    supabase.from('servicios').select('*').order('orden').then(({ data, error }) => {
      setServicios(data ?? []);
      if (error) setError(mensajeError(error));
    });
  }, []);

  const editar = (id, k, v) => setServicios((ss) => ss.map((s) => (s.id === id ? { ...s, [k]: v } : s)));

  const guardar = async (s) => {
    const { error } = await supabase.from('servicios').update({
      precio: s.precio === '' || s.precio === null ? null : Number(s.precio),
      duracion_min: Number(s.duracion_min),
      activo: s.activo
    }).eq('id', s.id);
    if (error) setError(mensajeError(error));
    else { setError(''); setGuardado(s.id); setTimeout(() => setGuardado(null), 1500); }
  };

  return (
    <section>
      <h2 className="titulo">Servicios y <em>duración</em></h2>
      <p className="muted">La duración define qué horarios ofrece el bot. Los inactivos no se pueden reservar.</p>
      {error && <p className="error" role="alert">{error}</p>}
      <div className="tabla-wrap">
        <table className="tabla">
          <thead><tr><th>Servicio</th><th>Precio (S/)</th><th>Duración (min)</th><th>Activo</th><th></th></tr></thead>
          <tbody>
            {servicios.map((s) => (
              <tr key={s.id} className={s.activo ? '' : 'inactivo'}>
                <td><small className="muted">{s.categoria}</small><br />{s.nombre}</td>
                <td><input type="number" min="0" step="1" value={s.precio ?? ''} onChange={(e) => editar(s.id, 'precio', e.target.value)} aria-label={`Precio de ${s.nombre}`} /></td>
                <td><input type="number" min="5" max="600" step="5" value={s.duracion_min} onChange={(e) => editar(s.id, 'duracion_min', e.target.value)} aria-label={`Duración de ${s.nombre}`} /></td>
                <td><input type="checkbox" checked={s.activo} onChange={(e) => editar(s.id, 'activo', e.target.checked)} aria-label={`${s.nombre} activo`} /></td>
                <td><button className="btn btn-ghost btn-sm" onClick={() => guardar(s)}>{guardado === s.id ? 'Guardado ✓' : 'Guardar'}</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
