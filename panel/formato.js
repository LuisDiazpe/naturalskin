import { enLima, diaSemana, sumarDias } from '../shared/agenda.js';
import { fechaLarga, hora12, mensajeCita } from '../shared/mensajes.js';

export { fechaLarga, hora12 };

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

export const horaDe = (iso) => enLima(new Date(iso)).hora;
export const fechaDe = (iso) => enLima(new Date(iso)).fecha;
export const aMinutos = (hhmm) => { const [h, m] = hhmm.split(':').map(Number); return h * 60 + m; };
export const deMinutos = (min) => `${String(Math.floor(min / 60)).padStart(2, '0')}:${String(min % 60).padStart(2, '0')}`;

// Lunes de la semana de `fecha`
export const lunesDe = (fecha) => sumarDias(fecha, -((diaSemana(fecha) + 6) % 7));

export const fechaCorta = (f) => `${DIAS_CORTO[diaSemana(f)]} ${f.slice(8)}/${f.slice(5, 7)}`;
export const fechaNumerica = (f) => f.split('-').reverse().join('/');

export const soles = (n) => (n == null || n === '' ? '—' : `S/ ${Number(n).toLocaleString('es-PE')}`);

// Para buscar sin importar tildes ni mayúsculas
export const normalizar = (s) => String(s ?? '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

// ---------- WhatsApp ----------
export const waLink = (telefono, texto) => `https://wa.me/${telefono}${texto ? `?text=${encodeURIComponent(texto)}` : ''}`;

// tipo: 'confirmacion' | 'reprogramacion' | 'recordatorio'
export const waMensaje = (cita, tipo) =>
  mensajeCita(tipo, { nombre: cita.clientes?.nombre, servicio: cita.servicios?.nombre, inicio: cita.inicio });
