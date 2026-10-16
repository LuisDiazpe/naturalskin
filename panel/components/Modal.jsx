import { useEffect, useId, useRef } from 'react';

export default function Modal({ titulo, onCerrar, children, className = '' }) {
  const id = useId();
  const cerrar = useRef(onCerrar);
  cerrar.current = onCerrar;

  useEffect(() => {
    const esc = (e) => { if (e.key === 'Escape') cerrar.current(); };
    document.addEventListener('keydown', esc);
    const antes = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', esc); document.body.style.overflow = antes; };
  }, []);

  return (
    <div className="modal-fondo" onMouseDown={(e) => e.target === e.currentTarget && onCerrar()}>
      <div className={`card modal ${className}`} role="dialog" aria-modal="true" aria-labelledby={id}>
        <div className="modal-head">
          <h2 className="titulo" id={id}>{titulo}</h2>
          <button type="button" className="cerrar" onClick={onCerrar} aria-label="Cerrar">×</button>
        </div>
        {children}
      </div>
    </div>
  );
}
