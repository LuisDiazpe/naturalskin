import { useState } from 'react';
import { supabase, mensajeError, formatoTelefono } from '../supabase';
import { ESTADOS, INACTIVOS, fechaDe, fechaLarga, horaDe, soles } from '../formato';
import { encolarAviso } from '../bot';
import Modal from './Modal';
import AvisosCita from './AvisosCita';
import { IconoWhatsApp } from './Iconos';

export default function CitaDetalle({ cita, onCerrar, onReprogramar, onCambio }) {
  const [estado, setEstado] = useState(cita.estado);
  const [error, setError] = useState('');
  const tel = cita.clientes?.telefono;

  const enviar = async (tipo) => {
    const { error } = await encolarAviso(cita.id, tipo);
    setError(error ? mensajeError(error) : '');
  };

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
        <dt>Celular</dt><dd>{formatoTelefono(tel)}</dd>
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

      <p className="etiqueta">Mensajes por WhatsApp (los envía el bot)</p>
      <AvisosCita citaId={cita.id} />
      {!INACTIVOS.includes(estado) && estado !== 'atendida' && (
        <div className="acciones-wa">
          <button type="button" className="btn btn-ghost btn-sm" onClick={() => enviar('confirmacion')}><IconoWhatsApp />Enviar confirmación</button>
          <button type="button" className="btn btn-ghost btn-sm" onClick={() => enviar('recordatorio')}><IconoWhatsApp />Enviar recordatorio</button>
        </div>
      )}

      <div className="modal-pie">
        <button type="button" className="btn btn-ghost" onClick={onCerrar}>Cerrar</button>
        <button type="button" className="btn btn-primary" onClick={() => onReprogramar({ ...cita, estado })}>Reprogramar</button>
      </div>
    </Modal>
  );
}
