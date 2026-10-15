import { img } from '../config';
import { Icon, WaLink } from './ui';

const PROMESAS = [
  ['chat-dots', 'Te escuchamos primero', 'Antes de cualquier tratamiento revisamos tu piel y conversamos sobre lo que buscas.'],
  ['list', 'Te explicamos todo', 'Qué haremos, cuántas sesiones necesitas y cuánto cuesta. Sin sorpresas.'],
  ['spark', 'Resultados naturales', 'Buscamos que luzcas como tú, con una piel más cuidada y luminosa.']
];

export default function Compromiso() {
  return (
    <section id="compromiso" className="section section-pink">
      <div className="blob drift" aria-hidden="true" style={{ left: -100, top: 80, width: 320, height: 320, background: 'var(--lila-luz)', filter: 'blur(90px)', opacity: 0.35 }}></div>
      <div className="container" style={{ position: 'relative' }}>
        <div className="sec-head reveal">
          <p className="kick">Recién abrimos</p>
          <h2 className="h2">Queremos <em>conocerte</em></h2>
          <p className="muted">Natural Skin es un espacio nuevo, creado con mucho cariño. Esto es lo que puedes esperar en cada visita.</p>
        </div>
        <div className="cards-3">
          {PROMESAS.map(([ic, t, d]) => (
            <div key={t} className="promise reveal"><span className="ic"><Icon id={ic} size={26} /></span><div><h3 className="h3">{t}</h3><p>{d}</p></div></div>
          ))}
        </div>
        <div className="welcome reveal">
          <img className="float" src={img('logo-monograma-160.png')} alt="" />
          <div className="welcome-text">
            <p className="serif">Sé una de nuestras <em>primeras clientas</em></p>
            <p>[Si hay una promoción de apertura, va aquí. Si no, se borra esta línea.]</p>
          </div>
          <WaLink className="btn btn-primary">Reservar mi cita</WaLink>
        </div>
      </div>
    </section>
  );
}
