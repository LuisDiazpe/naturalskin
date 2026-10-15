import { Fragment } from 'react';
import { MARQUEE } from '../data/tratamientos';

export default function Marquee() {
  // La lista va duplicada para que el desplazamiento sea continuo
  const items = [...MARQUEE, ...MARQUEE];
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {items.map((t, i) => (
          <Fragment key={i}><span>{t}</span><span className="star">✦</span></Fragment>
        ))}
      </div>
    </div>
  );
}
