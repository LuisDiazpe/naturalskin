import { useState } from 'react';
import { normalizar, soles } from '../formato';

// Lista de servicios con buscador y categorías (reemplaza al <select>, que cortaba la lista)
export default function ServicioPicker({ servicios, valor, onElegir }) {
  const [abierto, setAbierto] = useState(valor == null);
  const [q, setQ] = useState('');
  const [cat, setCat] = useState('Todas');
  const elegido = servicios.find((s) => s.id === valor);

  if (elegido && !abierto) {
    return (
      <div className="servicio-elegido">
        <div>
          <small>{elegido.categoria}</small>
          <strong>{elegido.nombre}</strong>
          <span>{elegido.duracion_min} min · {soles(elegido.precio)}</span>
        </div>
        <button type="button" className="btn btn-ghost btn-sm" onClick={() => setAbierto(true)}>Cambiar</button>
      </div>
    );
  }

  const categorias = ['Todas', ...new Set(servicios.map((s) => s.categoria))];
  const lista = servicios.filter((s) =>
    (cat === 'Todas' || s.categoria === cat) && normalizar(`${s.nombre} ${s.categoria}`).includes(normalizar(q))
  );

  return (
    <div className="picker">
      <input type="search" placeholder="Buscar servicio…" value={q} onChange={(e) => setQ(e.target.value)} aria-label="Buscar servicio" />
      <div className="picker-cats" role="group" aria-label="Categorías">
        {categorias.map((c) => (
          <button type="button" key={c} className={`pill${c === cat ? ' on' : ''}`} aria-pressed={c === cat} onClick={() => setCat(c)}>
            {c}{c !== 'Todas' && <span>{servicios.filter((s) => s.categoria === c).length}</span>}
          </button>
        ))}
      </div>
      <ul className="picker-lista" role="listbox" aria-label="Servicios">
        {servicios.length === 0 && <li className="muted">Cargando servicios…</li>}
        {servicios.length > 0 && lista.length === 0 && <li className="muted">Ningún servicio coincide.</li>}
        {lista.map((s) => (
          <li key={s.id} role="option" aria-selected={s.id === valor}>
            <button type="button" className={`picker-item${s.id === valor ? ' on' : ''}`} onClick={() => { onElegir(s.id); setAbierto(false); }}>
              <span><small>{s.categoria}</small>{s.nombre}</span>
              <span className="picker-meta">{s.duracion_min} min<b>{soles(s.precio)}</b></span>
            </button>
          </li>
        ))}
      </ul>
      <p className="muted picker-total">{lista.length} de {servicios.length} servicios</p>
    </div>
  );
}
