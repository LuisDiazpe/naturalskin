import { Icon, WaLink } from './ui';

export default function Hero() {
  return (
    <section id="inicio" className="container hero">
      <div className="hero-text">
        <p className="kick in-1"><Icon id="spark" size={16} />Cuidado facial · Estética natural</p>
        <h1 className="h1 in-2">Tu piel, en su versión más <em>natural</em></h1>
        <p className="lead in-3">Tratamientos faciales personalizados en un espacio cálido y tranquilo, pensado para que te relajes desde que cruzas la puerta.</p>
        <div className="hero-ctas in-4">
          <WaLink className="btn btn-primary"><Icon id="chat" />Reservar evaluación</WaLink>
          <a className="btn btn-ghost" href="#tratamientos">Ver tratamientos</a>
        </div>
        <ul className="hero-checks in-5">
          {['Evaluación personalizada', 'Productos [MARCAS]', 'Atención con cita'].map((t) => (
            <li key={t}><Icon id="check" style={{ color: 'var(--madera)' }} />{t}</li>
          ))}
        </ul>
      </div>

      <div className="hero-visual in-2">
        <div className="blob blob-lila drift" aria-hidden="true"></div>
        <div className="blob blob-luz drift-rev" aria-hidden="true"></div>
        <div className="hero-arch">
          {/* FOTO 1 · reemplazar por <img src="/assets/img/portada.webp" alt="..." /> */}
          <div className="ph"><div className="ph-tag"><b>Foto 1 · Portada</b>Rostro con piel luminosa, luz cálida y fondo rosa claro. Vertical 4:5.</div></div>
        </div>
        <div className="seal float-slow" aria-hidden="true">
          <svg className="seal-ring spin" width="140" height="140" viewBox="0 0 140 140" fill="none" stroke="#C29B3C" strokeWidth="1"><circle cx="70" cy="70" r="68" strokeDasharray="2 7" /></svg>
          <div className="seal-disc"><img src="/assets/img/logo-monograma-160.png" alt="" /></div>
        </div>
        <div className="float-card float">
          <span className="ic"><Icon id="leaf" size={22} /></span>
          <span><small>Ambiente</small><strong>Cálido y privado</strong></span>
        </div>
        <div className="float-pill float-slow"><Icon id="spark" size={14} />Resultados naturales</div>
      </div>
    </section>
  );
}
