import { formatoTelefono } from '../supabase';
import { fechaCorta, fechaDe, fechaLarga, horaDe, waMensaje } from '../formato';
import Modal from './Modal';
import AvisosCita from './AvisosCita';

// Se muestra justo después de reprogramar: resumen del cambio y estado del aviso que envía el bot
export default function AvisoReprogramada({ cita, onCerrar }) {
  return (
    <Modal titulo={<>Cita <em>reprogramada</em></>} onCerrar={onCerrar}>
      <dl className="detalle">
        <dt>Clienta</dt><dd>{cita.clientes.nombre || 'Sin nombre'} <span className="muted">· {formatoTelefono(cita.clientes.telefono)}</span></dd>
        <dt>Servicio</dt><dd>{cita.servicios.nombre}</dd>
        <dt>Antes</dt><dd className="tachado">{fechaCorta(fechaDe(cita.antes))} · {horaDe(cita.antes)}</dd>
        <dt>Ahora</dt><dd><b>{fechaLarga(fechaDe(cita.inicio))} · {horaDe(cita.inicio)} – {horaDe(cita.fin)}</b></dd>
      </dl>

      <p className="etiqueta">Confirmación por WhatsApp</p>
      <AvisosCita citaId={cita.id} limite={1} />

      <p className="etiqueta">Mensaje que recibirá</p>
      <pre className="mensaje-previo">{waMensaje(cita, 'reprogramacion')}</pre>

      <div className="modal-pie">
        <button type="button" className="btn btn-primary" onClick={onCerrar}>Listo</button>
      </div>
    </Modal>
  );
}
