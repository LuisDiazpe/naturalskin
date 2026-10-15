import { Icon } from './ui';

const FEATURES = [
  ['leaf', 'Ambiente relajante', 'Música suave, aromas y tiempo solo para ti.'],
  ['drop', 'Atención personalizada', 'Cada tratamiento parte de una evaluación de tu piel.'],
  ['shield', 'Higiene y cuidado', 'Material esterilizado y protocolos en cada sesión.']
];

export default function Espacio() {
  return (
    <section id="espacio" className="section section-pink">
      <div className="blob drift" aria-hidden="true" style={{ right: -80, top: 60, width: 320, height: 320, background: 'var(--luz-calida)', filter: 'blur(80px)', opacity: 0.5 }}></div>
      <div className="container split">
        <div className="gallery reveal">
          <div className="tall"><div className="ph"><div className="ph-tag"><b>Foto 7 · El salón</b>Sala completa: paredes blanco y rosa, piso de madera y luces cálidas.</div></div></div>
          <div><div className="ph"><div className="ph-tag"><b>Foto 8</b>Plantas fucsia y lila con luz cálida.</div></div></div>
          <div><div className="ph"><div className="ph-tag"><b>Foto 9</b>Camilla lista o productos.</div></div></div>
        </div>
        <div className="split-text">
          <p className="kick reveal">Nuestro espacio</p>
          <h2 className="h2 reveal">Un lugar cálido para <em>desconectar</em></h2>
          <p className="muted reveal">Paredes en blanco y rosa, piso de madera, plantas llenas de color y luz suave. Creamos Natural Skin para que cada visita se sienta como una pausa en tu semana.</p>
          <ul className="feature-list">
            {FEATURES.map(([ic, t, d]) => (
              <li key={t} className="reveal"><span className="ic"><Icon id={ic} size={22} /></span><span><strong>{t}</strong><span>{d}</span></span></li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
