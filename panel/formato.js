import { enLima, diaSemana, hoyLima, sumarDias } from '../shared/agenda.js';

export const ESTADOS = {
  pendiente: 'Pendiente',
  confirmada: 'Confirmada',
  atendida: 'Atendida',
  no_asistio: 'No asistió',
  cancelada: 'Cancelada'
};
// Estados que liberan el horario
export const INACTIVOS = ['cancelada', 'no_asistio'];

export const DIAS_CORTO = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
const DIAS_LARGO = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
const MESES = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];

export const horaDe = (iso) => enLima(new Date(iso)).hora;
export const fechaDe = (iso) => enLima(new Date(iso)).fecha;
export const aMinutos = (hhmm) => { const [h, m] = hhmm.split(':').map(Number); return h * 60 + m; };
export const deMinutos = (min) => `${String(Math.floor(min / 60)).padStart(2, '0')}:${String(min % 60).padStart(2, '0')}`;

// Lunes de la semana de `fecha`
export const lunesDe = (fecha) => sumarDias(fecha, -((diaSemana(fecha) + 6) % 7));

export function fechaLarga(f) {
  const [y, m, d] = f.split('-').map(Number);
  const anio = y !== Number(hoyLima().slice(0, 4)) ? ` de ${y}` : '';
  return `${DIAS_LARGO[diaSemana(f)]} ${d} de ${MESES[m - 1]}${anio}`;
}
export const fechaCorta = (f) => `${DIAS_CORTO[diaSemana(f)]} ${f.slice(8)}/${f.slice(5, 7)}`;
export const fechaNumerica = (f) => f.split('-').reverse().join('/');

export function hora12(hhmm) {
  const [h, m] = hhmm.split(':').map(Number);
  return `${h % 12 === 0 ? 12 : h % 12}:${String(m).padStart(2, '0')} ${h >= 12 ? 'p. m.' : 'a. m.'}`;
}

export const soles = (n) => (n == null || n === '' ? '—' : `S/ ${Number(n).toLocaleString('es-PE')}`);

// Para buscar sin importar tildes ni mayúsculas
export const normalizar = (s) => String(s ?? '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

// ---------- WhatsApp ----------
export const waLink = (telefono, texto) => `https://wa.me/${telefono}${texto ? `?text=${encodeURIComponent(texto)}` : ''}`;

export function waMensaje(cita, tipo) {
  const nombre = cita.clientes?.nombre ? ` ${cita.clientes.nombre.split(' ')[0]}` : '';
  const cuando = `${fechaLarga(fechaDe(cita.inicio))} a las ${hora12(horaDe(cita.inicio))}`;
  const servicio = cita.servicios?.nombre ?? 'tu tratamiento';
  if (tipo === 'recordatorio') {
    return `Hola${nombre}, te recordamos tu cita en Natural Skin:\n\n${servicio}\n${cuando}\nAv. José Pardo 1101, Miraflores\n\n¿Nos confirmas tu asistencia? Si necesitas cambiar la hora, respóndenos por aquí.`;
  }
  return `Hola${nombre}, te confirmamos tu cita en Natural Skin:\n\n${servicio}\n${cuando}\nAv. José Pardo 1101, Miraflores\n\nSi necesitas cambiar la fecha, respóndenos por aquí. ¡Te esperamos!`;
}
