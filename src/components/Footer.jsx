import { Status, TelLink, WaLink } from './ui';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <img className="footer-logo" src="/assets/img/logo-natural-skin.png" alt="Natural Skin" width="150" height="161" />
          <p className="muted" style={{ marginTop: 14 }}>Cuidado de la piel en un espacio cálido y natural.</p>
        </div>
        <div>
          <p className="kick">Visítanos</p>
          <p className="muted">[DIRECCIÓN]<br />[DISTRITO], Lima<br />[REFERENCIA]</p>
        </div>
        <div>
          <p className="kick">Horario</p>
          <div className="hours">
            <div><span>Lunes a jueves</span><b>9:00 a. m. – 7:00 p. m.</b></div>
            <div><span>Viernes</span><b>9:00 a. m. – 5:00 p. m.</b></div>
            <div><span>Sábado</span><b>Cerrado</b></div>
            <div><span>Domingo</span><b>Previa cita</b></div>
          </div>
          <Status className="status-line" />
        </div>
        <div>
          <p className="kick">Contacto</p>
          <p className="muted"><WaLink>WhatsApp [NÚMERO]</WaLink><br /><TelLink>Teléfono [TELÉFONO]</TelLink><br />[CORREO]</p>
        </div>
      </div>
      <p className="copy">© {new Date().getFullYear()} Natural Skin · Todos los derechos reservados</p>
    </footer>
  );
}
