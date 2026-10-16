// Lógica de agenda compartida por el panel y el bot (sin dependencias).
// Lima no tiene horario de verano: siempre UTC-5.
export const OFFSET_LIMA = '-05:00';
export const ESTADOS_ACTIVOS = ['pendiente', 'confirmada'];

// 'YYYY-MM-DD' + 'HH:MM' (hora de Lima) → Date
export const fechaHora = (fecha, hora) => new Date(`${fecha}T${hora.slice(0, 5)}:00${OFFSET_LIMA}`);

// Date → { fecha: 'YYYY-MM-DD', hora: 'HH:MM' } en hora de Lima
export function enLima(date) {
  const d = new Date(date.getTime() - 5 * 3600 * 1000);
  const iso = d.toISOString();
  return { fecha: iso.slice(0, 10), hora: iso.slice(11, 16) };
}

export const hoyLima = () => enLima(new Date()).fecha;

// 0 = domingo … 6 = sábado
export const diaSemana = (fecha) => fechaHora(fecha, '12:00').getUTCDay();

export function sumarDias(fecha, n) {
  const d = fechaHora(fecha, '12:00');
  d.setUTCDate(d.getUTCDate() + n);
  return enLima(d).fecha;
}

const cruza = (a0, a1, b0, b1) => a0 < b1 && b0 < a1;

/**
 * Horarios libres de un día para un servicio.
 * @param fecha     'YYYY-MM-DD'
 * @param duracion  minutos del servicio
 * @param horario   filas de la tabla `horario` ({ dia, abre, cierra })
 * @param ocupados  [{ inicio, fin }] de citas activas y bloqueos de ese día (ISO o Date)
 * @param paso      cada cuántos minutos se ofrece un horario
 * @returns ['09:00', '09:30', …] en hora de Lima
 */
export function horariosLibres({ fecha, duracion, horario, ocupados = [], paso = 30, ahora = new Date() }) {
  const dia = horario.find((h) => h.dia === diaSemana(fecha));
  if (!dia || !dia.abre) return [];
  const abre = fechaHora(fecha, dia.abre).getTime();
  const cierra = fechaHora(fecha, dia.cierra).getTime();
  const rangos = ocupados.map((o) => [new Date(o.inicio).getTime(), new Date(o.fin).getTime()]);
  const libres = [];
  for (let t = abre; t + duracion * 60000 <= cierra; t += paso * 60000) {
    const fin = t + duracion * 60000;
    if (t <= ahora.getTime()) continue;
    if (rangos.some(([a, b]) => cruza(t, fin, a, b))) continue;
    libres.push(enLima(new Date(t)).hora);
  }
  return libres;
}

// Límites de un día en hora de Lima, para consultar la base de datos
export const rangoDia = (fecha) => ({
  desde: fechaHora(fecha, '00:00').toISOString(),
  hasta: fechaHora(sumarDias(fecha, 1), '00:00').toISOString()
});
