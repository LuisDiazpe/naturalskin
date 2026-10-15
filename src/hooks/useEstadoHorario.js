import { useEffect, useState } from 'react';
import { CONFIG } from '../config';

// ---------- Estado "Abierto ahora" según la hora de Lima ----------
function horaLima() {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: CONFIG.zonaHoraria, weekday: 'short', hour: 'numeric', minute: 'numeric', hourCycle: 'h23'
  }).formatToParts(new Date());
  const get = (t) => parts.find((p) => p.type === t).value;
  const day = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(get('weekday'));
  return { day, min: Number(get('hour')) * 60 + Number(get('minute')) };
}
const fmt = (h) => (h === 12 ? '12:00 m.' : h > 12 ? `${h - 12}:00 p. m.` : `${h}:00 a. m.`);

function estadoHorario() {
  const { day, min } = horaLima();
  const hoy = CONFIG.horario[day];
  if (Array.isArray(hoy)) {
    const [abre, cierra] = hoy;
    if (min >= abre * 60 && min < cierra * 60) return { texto: `Abierto ahora · hasta las ${fmt(cierra)}`, color: 'var(--abierto)' };
    if (min < abre * 60) return { texto: `Cerrado · hoy abrimos a las ${fmt(abre)}`, color: 'var(--cerrado)' };
  }
  if (hoy === 'cita') return { texto: 'Hoy domingo atendemos solo con cita previa', color: 'var(--dorado)' };
  const manana = CONFIG.horario[(day + 1) % 7];
  if (Array.isArray(manana)) return { texto: `Cerrado · mañana abrimos a las ${fmt(manana[0])}`, color: 'var(--cerrado)' };
  return { texto: 'Cerrado · domingo con cita previa, lunes desde las 9:00 a. m.', color: 'var(--cerrado)' };
}

export function useEstadoHorario() {
  const [estado, setEstado] = useState(estadoHorario);
  useEffect(() => {
    const id = setInterval(() => setEstado(estadoHorario()), 60 * 1000);
    return () => clearInterval(id);
  }, []);
  return estado;
}
