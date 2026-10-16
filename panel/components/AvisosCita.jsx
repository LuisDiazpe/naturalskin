import { reintentarAviso, useAvisos, useBotEstado } from '../bot';
import { fechaCorta, fechaDe, horaDe } from '../formato';

const TIPOS = { confirmacion: 'Confirmación', reprogramacion: 'Reprogramación', recordatorio: 'Recordatorio' };

// Historial de mensajes de WhatsApp de una cita: en cola, enviado o con error
export default function AvisosCita({ citaId, limite = 5 }) {
  const avisos = useAvisos(citaId);
  const bot = useBotEstado();
  if (!avisos.length) return <p className="muted">Todavía no se le ha enviado ningún mensaje.</p>;

  return (
    <ul className="avisos">
      {avisos.slice(0, limite).map((a) => {
        let estado, clase;
        if (a.enviado_en) {
          estado = `Enviado ${a.via === 'manual' ? 'a mano' : 'por el bot'} · ${fechaCorta(fechaDe(a.enviado_en))} ${horaDe(a.enviado_en)}`;
          clase = 'ok';
        } else if (a.error) {
          estado = a.error;
          clase = 'error';
        } else {
          estado = bot.activo ? 'En cola · se envía en unos segundos…' : 'En cola · se enviará cuando el bot se conecte';
          clase = 'cola';
        }
        return (
          <li key={a.id} className={`aviso-item ${clase}`}>
            <b>{TIPOS[a.tipo]}</b>
            <span>{estado}</span>
            {clase === 'error' && !a.error.startsWith('Omitido') && (
              <button type="button" className="btn btn-ghost btn-sm" onClick={() => reintentarAviso(a.id)}>Reintentar</button>
            )}
          </li>
        );
      })}
    </ul>
  );
}
