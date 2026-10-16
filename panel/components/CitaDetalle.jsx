import { useState } from 'react';
import { supabase, mensajeError, formatoTelefono } from '../supabase';
import { ESTADOS, fechaDe, fechaLarga, horaDe, soles, waLink, waMensaje } from '../formato';
import Modal from './Modal';
import { IconoWhatsApp } from './Iconos';

export default function CitaDetalle({ cita, onCerrar, onReprogramar, onCambio }) {
  const [estado, setEstado] = useState(cita.estado);
  const [error, setError] = useState('');
  const tel = cita.clientes?.telefono;

  const cambiar = async (v) => {
    if (v === estado) return;
    const { error } = await supabase.from('citas').update({ estado: v }).eq('id', cita.id);
    if (error) { setError(mensajeError(error)); return; }
    setError('');
    setEstado(v);
    onCambio();
  };

  return (
    <Modal titulo={cita.clientes?.nombre || 'Sin nombre'} onCerrar={onCerrar}>
      <dl className="detalle">
        <dt>Servicio</dt><dd>{cita.servicios?.nombre} <span className="muted">· {soles(cita.servicios?.precio)}</span></dd>
        <dt>Fecha</dt><dd>{fechaLarga(fechaDe(cita.inicio))}</dd>
        <dt>Hora</dt><dd>{horaDe(cita.inicio)} – {horaDe(cita.fin)}</dd>
        <dt>Celular</dt><dd><a href={waLink(tel)} target="_blank" rel="noopener">{formatoTelefono(tel)}</a></dd>
        {cita.notas && <><dt>Notas</dt><dd>{cita.notas}</dd></>}
        <dt>Origen</dt><dd>{cita.origen === 'bot' ? 'Bot de WhatsApp' : 'Panel'}</dd>
      </dl>

      <p className="etiqueta">Estado</p>
      <div className="estados" role="radiogroup" aria-label="Estado de la cita">
        {Object.entries(ESTADOS).map(([v, l]) => (
          <button type="button" key={v} role="radio" aria-checked={estado === v}
            className={`badge estado-${v}${estado === v ? ' on' : ''}`} onClick={() => cambiar(v)}>{l}</button>
        ))}
      </div>
      {error && <p className="error" role="alert">{error}</p>}

      <p className="etiqueta">WhatsApp</p>
      <div className="acciones-wa">
        <a className="btn btn-ghost btn-sm" href={waLink(tel, waMensaje(cita, 'confirmacion'))} target="_blank" rel="noopener"><IconoWhatsApp />Enviar confirmación</a>
        <a className="btn btn-ghost btn-sm" href={waLink(tel, waMensaje(cita, 'recordatorio'))} target="_blank" rel="noopener"><IconoWhatsApp />Enviar recordatorio</a>
      </div>

      <div className="modal-pie">
        <button type="button" className="btn btn-ghost" onClick={onCerrar}>Cerrar</button>
        <button type="button" className="btn btn-primary" onClick={() => onReprogramar({ ...cita, estado })}>Reprogramar</button>
      </div>
    </Modal>
  );
}
