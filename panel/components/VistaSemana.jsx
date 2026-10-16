import { diaSemana, enLima, hoyLima } from '../../shared/agenda.js';
import { DIAS_CORTO, INACTIVOS, aMinutos, deMinutos, fechaCorta, fechaDe, horaDe } from '../formato';

const PX_MIN = 64 / 60; // 64 px por hora
const PASO = 30;        // filas de 30 minutos

// Reparte en columnas las citas que se cruzan (p. ej. una cancelada y una nueva en la misma hora)
function carriles(citas) {
  const res = new Map();
  let grupo = [];
  let finGrupo = 0;
  const cerrarGrupo = () => {
    const finCarril = [];
    grupo.forEach((c) => {
      const ini = +new Date(c.inicio);
      let i = finCarril.findIndex((f) => f <= ini);
      if (i === -1) { i = finCarril.length; finCarril.push(0); }
      finCarril[i] = +new Date(c.fin);
      res.set(c.id, { carril: i });
    });
    grupo.forEach((c) => { res.get(c.id).total = finCarril.length; });
    grupo = [];
    finGrupo = 0;
  };
  [...citas].sort((a, b) => new Date(a.inicio) - new Date(b.inicio)).forEach((c) => {
    if (grupo.length && +new Date(c.inicio) >= finGrupo) cerrarGrupo();
    grupo.push(c);
    finGrupo = Math.max(finGrupo, +new Date(c.fin));
  });
  if (grupo.length) cerrarGrupo();
  return res;
}

// Minuto del día en que termina la cita (24:00 si pasa de medianoche)
const finEnMinutos = (c) => (fechaDe(c.fin) !== fechaDe(c.inicio) ? 24 * 60 : aMinutos(horaDe(c.fin)));

export default function VistaSemana({ semana, citas, horario, mostrarInactivas, onAbrir, onNueva, onDia }) {
  const hoy = hoyLima();
  const visibles = citas.filter((c) => mostrarInactivas || !INACTIVOS.includes(c.estado));

  // Rango de horas: el horario de atención, ampliado si hay citas fuera de él
  let ini = 9 * 60, fin = 19 * 60;
  horario.forEach((h) => { if (h.abre) { ini = Math.min(ini, aMinutos(h.abre)); fin = Math.max(fin, aMinutos(h.cierra)); } });
  visibles.forEach((c) => { ini = Math.min(ini, aMinutos(horaDe(c.inicio))); fin = Math.max(fin, finEnMinutos(c)); });
  ini = Math.floor(ini / 60) * 60;
  fin = Math.min(24 * 60, Math.ceil(fin / 60) * 60);

  const horas = [];
  for (let m = ini; m < fin; m += 60) horas.push(m);
  const filas = [];
  for (let m = ini; m < fin; m += PASO) filas.push(m);
  const ahora = aMinutos(enLima(new Date()).hora);

  return (
    <div className="sg-wrap">
      <div className="sg" style={{ '--alto': `${(fin - ini) * PX_MIN}px` }}>
        <div className="sg-esquina" />
        {semana.map((f) => {
          const n = visibles.filter((c) => fechaDe(c.inicio) === f).length;
          return (
            <button type="button" key={f} className={`sg-head${f === hoy ? ' es-hoy' : ''}`} onClick={() => onDia(f)} title="Ver el día">
              <small>{DIAS_CORTO[diaSemana(f)]}</small><b>{Number(f.slice(8))}</b>
              <span>{n ? `${n} cita${n > 1 ? 's' : ''}` : '—'}</span>
            </button>
          );
        })}

        <div className="sg-horas" aria-hidden="true">
          {horas.map((m) => <span key={m} style={{ top: (m - ini) * PX_MIN }}>{deMinutos(m)}</span>)}
        </div>

        {semana.map((f) => {
          const h = horario.find((x) => x.dia === diaSemana(f));
          const abre = h?.abre ? aMinutos(h.abre) : null;
          const cierra = h?.cierra ? aMinutos(h.cierra) : null;
          const delDia = visibles.filter((c) => fechaDe(c.inicio) === f);
          const lugar = carriles(delDia);
          return (
            <div key={f} className="sg-col">
              {filas.map((m) => (
                <button type="button" key={m} tabIndex={-1}
                  className={`sg-celda${abre == null || m < abre || m >= cierra ? ' cerrado' : ''}${m % 60 === 0 ? ' en-hora' : ''}`}
                  style={{ height: PASO * PX_MIN }}
                  onClick={() => onNueva(f, deMinutos(m))}
                  aria-label={`Nueva cita el ${fechaCorta(f)} a las ${deMinutos(m)}`} />
              ))}
              {f === hoy && ahora >= ini && ahora <= fin && <div className="sg-ahora" style={{ top: (ahora - ini) * PX_MIN }} aria-hidden="true" />}
              {delDia.map((c) => {
                const a = aMinutos(horaDe(c.inicio));
                const b = finEnMinutos(c);
                const { carril, total } = lugar.get(c.id);
                return (
                  <button type="button" key={c.id} className={`sg-cita estado-${c.estado}`}
                    style={{
                      top: (a - ini) * PX_MIN + 1,
                      height: Math.max((b - a) * PX_MIN - 2, 22),
                      left: `calc(${(carril / total) * 100}% + 2px)`,
                      width: `calc(${100 / total}% - 4px)`
                    }}
                    onClick={() => onAbrir(c)}
                    title={`${horaDe(c.inicio)}–${horaDe(c.fin)} · ${c.clientes?.nombre || 'Sin nombre'} · ${c.servicios?.nombre}`}>
                    <b>{horaDe(c.inicio)} {c.clientes?.nombre || 'Sin nombre'}</b>
                    <small>{c.servicios?.nombre}</small>
                  </button>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}
