import { formatoTelefono } from '../supabase';
import { horaDe } from '../formato';
import EstadoMenu from './EstadoMenu';

export default function VistaDia({ citas, onAbrir, onReprogramar, onEstado }) {
  if (citas.length === 0) return <p className="vacio">No hay citas este día.</p>;

  return (
    <ul className="citas">
      {citas.map((c) => (
        <li key={c.id} className={`cita estado-${c.estado}`}>
          <button type="button" className="cita-abrir" onClick={() => onAbrir(c)}>
            <span className="cita-hora"><b>{horaDe(c.inicio)}</b><small>{horaDe(c.fin)}</small></span>
            <span className="cita-info">
              <strong>{c.clientes?.nombre || 'Sin nombre'}</strong>
              <span>{c.servicios?.nombre}</span>
              <span className="muted">{formatoTelefono(c.clientes?.telefono)}{c.notas && ` · ${c.notas}`}</span>
            </span>
          </button>
          <div className="cita-acciones">
            {c.origen === 'bot' && <span className="chip">Bot</span>}
            <EstadoMenu estado={c.estado} onCambiar={(v) => onEstado(c, v)} />
            <button type="button" className="btn btn-ghost btn-sm" onClick={() => onReprogramar(c)}>Reprogramar</button>
          </div>
        </li>
      ))}
    </ul>
  );
}
