import { Icon, WaLink } from './ui';

const TECH = [
  ['HIFU · lifting profundo', 'Actúa en las capas profundas de la piel.'],
  ['Radiofrecuencia · reafirma y tensa', 'Estimula el colágeno y mejora la elasticidad.'],
  ['EMS · tonifica y define', 'Estimula los músculos y mejora la firmeza.']
];

export default function Hifu() {
  return (
    <section id="hifu" className="section star-sec" aria-labelledby="hifu-title">
      <div className="container">
        <div className="star reveal">
          <div className="blob drift" aria-hidden="true" style={{ right: -80, top: -60, width: 300, height: 300, background: 'var(--lila-luz)', filter: 'blur(90px)', opacity: 0.4 }}></div>
          <div className="star-media">
            <div className="star-photo"><div className="ph"><div className="ph-tag"><b>Foto 10 · HIFU 25D MAX</b>El equipo en uso sobre el rostro o la mandíbula.</div></div></div>
            <div className="star-price float"><small>Rostro + papada</small><b>S/ 380</b></div>
          </div>
          <div className="star-text">
            <p className="kick">Tratamiento estrella</p>
            <h2 className="h2" id="hifu-title">HIFU 25D MAX: 3 tecnologías en <em>1 tratamiento</em></h2>
            <p className="muted">Levanta, reafirma y define tu rostro en una sola sesión.</p>
            <ol className="tech">
              {TECH.map(([t, d], i) => (
                <li key={t}><span className="tech-n">{i + 1}</span><div><strong>{t}</strong><span>{d}</span></div></li>
              ))}
            </ol>
            <ul className="star-tags">
              <li><Icon id="check" size={16} />Sin cirugía</li>
              <li><Icon id="check" size={16} />Sin tiempo de recuperación</li>
            </ul>
            <WaLink className="btn btn-primary" msg="Hola, quiero reservar HIFU 25D MAX para rostro"><Icon id="chat" />Reservar HIFU 25D MAX</WaLink>
          </div>
        </div>
      </div>
    </section>
  );
}
