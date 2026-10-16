import { useRef, useState } from 'react';
import { CATEGORIAS } from '../data/tratamientos';
import { Icon, WaLink } from './ui';

function Card({ t, i, cat }) {
  return (
    <article className={`t-card${t.hot ? ' t-card-hot' : ''}`} style={{ '--i': i }}>
      <div className="t-card-top">
        <div className="t-photo"><div className="ph"><span className="ph-mini">{cat.foto}</span></div></div>
        <span className={`chip${t.hot ? ' chip-hot' : ''}`}>{t.chip ?? cat.chip}</span>
      </div>
      <h3 className="h3">{t.nombre}</h3>
      <p>{t.desc}</p>
      {t.listaLabel && <p className="t-list-label">{t.listaLabel}</p>}
      {t.lista && <ul className="t-list">{t.lista.map((x) => <li key={x}>{x}</li>)}</ul>}
      <div className="t-card-foot">
        {t.precio
          ? <span className="price"><b>{t.precio.monto}</b>{t.precio.nota && <small>{t.precio.nota}</small>}</span>
          : <span>Desde [PRECIO]</span>}
        <WaLink className="link-cta" msg={t.msg}>Reservar →</WaLink>
      </div>
    </article>
  );
}

// Pestañas de tratamientos (patrón ARIA tabs)
export default function Tratamientos() {
  const [active, setActive] = useState(CATEGORIAS[0].id);
  const tabRefs = useRef({});
  const panelRefs = useRef({});

  const select = (id, focus) => {
    setActive(id);
    const tab = tabRefs.current[id];
    const panel = panelRefs.current[id];
    if (panel) panel.scrollLeft = 0;
    if (focus) tab.focus();
    tab.scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'smooth' });
  };

  const onKeyDown = (e, i) => {
    const dir = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
    if (dir) {
      e.preventDefault();
      select(CATEGORIAS[(i + dir + CATEGORIAS.length) % CATEGORIAS.length].id, true);
    }
  };

  return (
    <section id="tratamientos" className="section">
      <div className="container">
        <div className="sec-head reveal">
          <p className="kick">Tratamientos</p>
          <h2 className="h2">Todo lo que tu piel <em>necesita</em></h2>
          <p className="muted">Limpiezas, HIFU, tratamientos regenerativos, corporales y sueroterapia. Elige una categoría.</p>
        </div>

        <div className="tabs" role="tablist" aria-label="Categorías de tratamientos">
          {CATEGORIAS.map((c, i) => (
            <button
              key={c.id}
              ref={(el) => { tabRefs.current[c.id] = el; }}
              className="tab"
              role="tab"
              id={`tab-${c.id}`}
              aria-controls={`panel-${c.id}`}
              aria-selected={active === c.id}
              tabIndex={active === c.id ? 0 : -1}
              onClick={() => select(c.id, false)}
              onKeyDown={(e) => onKeyDown(e, i)}
            >
              {c.nombre} <span className="count">{c.items.length}</span>
            </button>
          ))}
        </div>
        <p className="swipe-hint">Desliza para ver más <span className="nudge"><Icon id="arrow" size={16} /></span></p>

        {CATEGORIAS.map((c) => (
          <div
            key={c.id}
            ref={(el) => { panelRefs.current[c.id] = el; }}
            className="panel"
            role="tabpanel"
            id={`panel-${c.id}`}
            aria-labelledby={`tab-${c.id}`}
            hidden={active !== c.id}
          >
            {c.items.map((t, i) => <Card key={t.nombre} t={t} i={i} cat={c} />)}
          </div>
        ))}

        <p className="after-note reveal">¿No sabes cuál elegir? <WaLink>Agenda una evaluación</WaLink> y te recomendamos el tratamiento ideal para tu piel.</p>
      </div>
    </section>
  );
}
