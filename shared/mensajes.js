// Textos para la clienta (WhatsApp). Los usan el panel (envío manual) y el bot (envío automático).
import { diaSemana, enLima, hoyLima } from './agenda.js';

const DIAS = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
const MESES = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
const DIRECCION = 'Av. José Pardo 1101, Miraflores';

// '2026-10-16' → 'viernes 16 de octubre'
export function fechaLarga(f) {
  const [y, m, d] = f.split('-').map(Number);
  const anio = y !== Number(hoyLima().slice(0, 4)) ? ` de ${y}` : '';
  return `${DIAS[diaSemana(f)]} ${d} de ${MESES[m - 1]}${anio}`;
}

// '15:00' → '3:00 p. m.'
export function hora12(hhmm) {
  const [h, m] = hhmm.split(':').map(Number);
  return `${h % 12 === 0 ? 12 : h % 12}:${String(m).padStart(2, '0')} ${h >= 12 ? 'p. m.' : 'a. m.'}`;
}

/**
 * @param tipo  'confirmacion' | 'reprogramacion' | 'recordatorio'
 * @param datos { nombre, servicio, inicio } (inicio: ISO o Date)
 */
export function mensajeCita(tipo, { nombre, servicio, inicio }) {
  const hola = `Hola${nombre ? ` ${nombre.trim().split(' ')[0]}` : ''}`;
  const { fecha, hora } = enLima(new Date(inicio));
  const detalle = `${servicio ?? 'Tu tratamiento'}\n${fechaLarga(fecha)} a las ${hora12(hora)}\n${DIRECCION}`;
  if (tipo === 'reprogramacion') {
    return `${hola}, tu cita en Natural Skin fue reprogramada. Este es tu nuevo horario:\n\n${detalle}\n\nSi necesitas otro cambio, respóndenos por aquí. ¡Te esperamos!`;
  }
  if (tipo === 'recordatorio') {
    return `${hola}, te recordamos tu cita en Natural Skin:\n\n${detalle}\n\n¿Nos confirmas tu asistencia? Si necesitas cambiar la hora, respóndenos por aquí.`;
  }
  return `${hola}, te confirmamos tu cita en Natural Skin:\n\n${detalle}\n\nSi necesitas cambiar la fecha, respóndenos por aquí. ¡Te esperamos!`;
}
