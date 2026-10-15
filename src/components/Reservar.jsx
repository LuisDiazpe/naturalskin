import { img } from '../config';
import { Icon, Status, TelLink, WaLink } from './ui';

export default function Reservar() {
  return (
    <section id="reservar" className="cta-wrap">
      <div className="cta reveal">
        <div className="blob blob-a drift" aria-hidden="true"></div>
        <div className="blob blob-b drift-rev" aria-hidden="true"></div>
        <div className="cta-inner">
          <img className="cta-logo float" src={img('logo-monograma-160.png')} alt="" />
          <p className="kick">Agenda abierta</p>
          <h2 className="h2">Reserva tu <em>evaluación</em> y empieza a cuidar tu piel</h2>
          <p className="cta-sub">Escríbenos y te respondemos para coordinar el día y la hora.</p>
          <Status className="status-pill" />
          <div className="cta-btns">
            <WaLink className="btn btn-primary"><Icon id="chat" />Escribir por WhatsApp</WaLink>
            <TelLink className="btn btn-ghost-light">Llamar [TELÉFONO]</TelLink>
          </div>
        </div>
      </div>
    </section>
  );
}
