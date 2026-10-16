import { useEffect, useRef, useState } from 'react';
import { ESTADOS } from '../formato';

// Etiqueta de color con el estado de la cita; al tocarla se elige otro estado
export default function EstadoMenu({ estado, onCambiar }) {
  const [abierto, setAbierto] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!abierto) return;
    const fuera = (e) => { if (!ref.current?.contains(e.target)) setAbierto(false); };
    const esc = (e) => { if (e.key === 'Escape') { e.stopPropagation(); setAbierto(false); } };
    document.addEventListener('pointerdown', fuera);
    document.addEventListener('keydown', esc, true);
    return () => { document.removeEventListener('pointerdown', fuera); document.removeEventListener('keydown', esc, true); };
  }, [abierto]);

  return (
    <div className="estado-menu" ref={ref}>
      <button type="button" className={`badge estado-${estado}`} aria-haspopup="listbox" aria-expanded={abierto}
        onClick={() => setAbierto(!abierto)}>
        {ESTADOS[estado]} <span className="flecha" aria-hidden="true">▾</span>
      </button>
      {abierto && (
        <ul className="estado-pop" role="listbox" aria-label="Cambiar estado">
          {Object.entries(ESTADOS).map(([v, l]) => (
            <li key={v} role="option" aria-selected={v === estado}>
              <button type="button" className={`badge estado-${v}`} onClick={() => { setAbierto(false); if (v !== estado) onCambiar(v); }}>
                {l}{v === estado && ' ✓'}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
