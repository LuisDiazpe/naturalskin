import { useCallback, useEffect, useState } from 'react';
import { supabase, mensajeError, SELECT_CITA } from '../supabase';
import { diaSemana, hoyLima, rangoDia, sumarDias } from '../../shared/agenda.js';
import { DIAS_CORTO, INACTIVOS, fechaDe, fechaLarga, lunesDe } from '../formato';
import VistaDia from './VistaDia';
import VistaSemana from './VistaSemana';
import VistaTodas from './VistaTodas';
import CitaDetalle from './CitaDetalle';
import CitaForm from './CitaForm';

const VISTAS = [['dia', 'Día'], ['semana', 'Semana'], ['todas', 'Todas']];

export default function Agenda() {
  const [vista, setVista] = useState(() => localStorage.getItem('ns-vista') || (window.innerWidth >= 900 ? 'semana' : 'dia'));
  const [fecha, setFecha] = useState(hoyLima());
  const [citas, setCitas] = useState([]);   // citas de la semana de `fecha`
  const [horario, setHorario] = useState([]);
  const [rev, setRev] = useState(0);        // sube para forzar recarga
  const [error, setError] = useState('');
  const [mostrarInactivas, setMostrarInactivas] = useState(false);
  const [detalle, setDetalle] = useState(null);
  const [form, setForm] = useState(null);   // { cita } para reprogramar o { inicial: { fecha, hora } } para crear

  const recargar = useCallback(() => setRev((r) => r + 1), []);
  const hoy = hoyLima();
  const lunes = lunesDe(fecha);
  const semana = Array.from({ length: 7 }, (_, i) => sumarDias(lunes, i));

  useEffect(() => { localStorage.setItem('ns-vista', vista); }, [vista]);

  useEffect(() => {
    supabase.from('horario').select('dia, abre, cierra').then(({ data }) => setHorario(data ?? []));
  }, []);

  useEffect(() => {
    let vivo = true;
    supabase.from('citas').select(SELECT_CITA)
      .gte('inicio', rangoDia(lunes).desde).lt('inicio', rangoDia(sumarDias(lunes, 7)).desde)
      .order('inicio')
      .then(({ data, error }) => {
        if (!vivo) return;
        setCitas(data ?? []);
        setError(error ? mensajeError(error) : '');
      });
    return () => { vivo = false; };
  }, [lunes, rev]);

  // Tiempo real: si el bot u otra persona cambia una cita, se recarga
  useEffect(() => {
    const canal = supabase.channel(`citas-panel-${Math.random().toString(36).slice(2)}`)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'citas' }, recargar)
      .subscribe();
    return () => { supabase.removeChannel(canal); };
  }, [recargar]);

  const cambiarEstado = async (c, estado) => {
    const { error } = await supabase.from('citas').update({ estado }).eq('id', c.id);
    if (error) setError(mensajeError(error)); else { setError(''); recargar(); }
  };

  const paso = vista === 'semana' ? 7 : 1;
  const delDia = citas.filter((c) => fechaDe(c.inicio) === fecha);
  const activasPorDia = (f) => citas.filter((c) => fechaDe(c.inicio) === f && !INACTIVOS.includes(c.estado)).length;

  return (
    <section>
      <div className="barra">
        <div className="segmentado" role="tablist" aria-label="Vista de la agenda">
          {VISTAS.map(([id, label]) => (
            <button type="button" key={id} role="tab" aria-selected={vista === id} onClick={() => setVista(id)}>{label}</button>
          ))}
        </div>
        {vista !== 'todas' && (
          <div className="nav-fecha">
            <button type="button" className="btn btn-ghost btn-sm" onClick={() => setFecha(sumarDias(fecha, -paso))} aria-label={vista === 'semana' ? 'Semana anterior' : 'Día anterior'}>‹</button>
            <button type="button" className="btn btn-ghost btn-sm" onClick={() => setFecha(hoy)}>Hoy</button>
            <button type="button" className="btn btn-ghost btn-sm" onClick={() => setFecha(sumarDias(fecha, paso))} aria-label={vista === 'semana' ? 'Semana siguiente' : 'Día siguiente'}>›</button>
            <input type="date" value={fecha} onChange={(e) => e.target.value && setFecha(e.target.value)} aria-label="Ir a fecha" />
          </div>
        )}
        <button type="button" className="btn btn-primary" onClick={() => setForm({ inicial: { fecha: fecha < hoy ? hoy : fecha } })}>+ Nueva cita</button>
      </div>

      {error && <p className="error" role="alert">{error}</p>}

      {vista === 'dia' && (
        <>
          <div className="semana" role="tablist" aria-label="Días de la semana">
            {semana.map((f) => {
              const n = activasPorDia(f);
              return (
                <button type="button" key={f} role="tab" aria-selected={f === fecha} className={`dia${f === hoy ? ' es-hoy' : ''}`} onClick={() => setFecha(f)}>
                  <small>{DIAS_CORTO[diaSemana(f)]}</small>
                  <b>{Number(f.slice(8))}</b>
                  <span className="conteo">{n ? `${n} cita${n > 1 ? 's' : ''}` : '—'}</span>
                </button>
              );
            })}
          </div>
          <h2 className="titulo">{fechaLarga(fecha)}</h2>
          <VistaDia citas={delDia} onAbrir={setDetalle} onReprogramar={(c) => setForm({ cita: c })} onEstado={cambiarEstado} />
        </>
      )}

      {vista === 'semana' && (
        <>
          <div className="semana-head">
            <h2 className="titulo">Semana del {fechaLarga(lunes)}</h2>
            <label className="check"><input type="checkbox" checked={mostrarInactivas} onChange={(e) => setMostrarInactivas(e.target.checked)} />Mostrar canceladas y "no asistió"</label>
          </div>
          <p className="muted ayuda">Toca un espacio vacío para crear una cita a esa hora, o una cita para ver el detalle.</p>
          <VistaSemana semana={semana} citas={citas} horario={horario} mostrarInactivas={mostrarInactivas}
            onAbrir={setDetalle}
            onNueva={(f, hora) => setForm({ inicial: { fecha: f, hora } })}
            onDia={(f) => { setFecha(f); setVista('dia'); }} />
        </>
      )}

      {vista === 'todas' && <VistaTodas rev={rev} onAbrir={setDetalle} />}

      {detalle && (
        <CitaDetalle key={detalle.id} cita={detalle} onCerrar={() => setDetalle(null)} onCambio={recargar}
          onReprogramar={(c) => { setDetalle(null); setForm({ cita: c }); }} />
      )}
      {form && (
        <CitaForm {...form} onCerrar={() => setForm(null)}
          onGuardada={(f) => { setForm(null); setFecha(f); recargar(); }} />
      )}
    </section>
  );
}
