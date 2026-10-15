import { useEffect, useState } from 'react';
import { img } from '../config';
import { WaLink } from './ui';

const LINKS = [
  ['#tratamientos', 'Tratamientos'],
  ['#espacio', 'Nosotros'],
  ['#compromiso', 'Por qué elegirnos'],
  ['#preguntas', 'Preguntas']
];

export default function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const close = () => setOpen(false);

  return (
    <header className="header">
      <div className="container header-row">
        <a className="brand" href="#inicio" aria-label="Natural Skin, inicio">
          <img src={img('logo-monograma-160.png')} alt="" width="52" height="54" />
          <span>Natural Skin</span>
        </a>
        <nav className="nav" aria-label="Principal">
          {LINKS.map(([href, label]) => <a key={href} href={href}>{label}</a>)}
        </nav>
        <WaLink className="btn btn-primary">Reservar cita</WaLink>
        <button
          className="menu-btn"
          type="button"
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={open}
          aria-controls="menu-movil"
          onClick={() => setOpen(!open)}
        >
          <svg className="i-open" width="22" height="22" aria-hidden="true"><use href="#i-menu" /></svg>
          <svg className="i-close" width="22" height="22" aria-hidden="true"><use href="#i-close" /></svg>
        </button>
      </div>
      <nav className={`mobile-menu${open ? ' open' : ''}`} id="menu-movil" aria-label="Menú móvil">
        {LINKS.map(([href, label]) => <a key={href} href={href} onClick={close}>{label} <span>→</span></a>)}
        <WaLink className="btn btn-primary" onClick={close}>Reservar cita</WaLink>
      </nav>
    </header>
  );
}
