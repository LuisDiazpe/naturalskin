import { Icon, TelLink, WaLink } from './ui';

// Barra fija de reserva (solo celular)
export default function BottomBar() {
  return (
    <div className="bottom-bar">
      <WaLink className="btn btn-primary"><Icon id="chat" />Reservar por WhatsApp</WaLink>
      <TelLink className="call" aria-label="Llamar"><Icon id="phone" size={20} /></TelLink>
    </div>
  );
}
