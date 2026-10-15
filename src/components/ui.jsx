import { waHref, telHref } from '../config';
import { useEstadoHorario } from '../hooks/useEstadoHorario';

export function Icon({ id, size = 18, ...rest }) {
  return <svg width={size} height={size} aria-hidden="true" {...rest}><use href={`#i-${id}`} /></svg>;
}

// Enlace a WhatsApp. `msg` define un mensaje por tratamiento.
export function WaLink({ msg, children, ...rest }) {
  return <a href={waHref(msg)} target="_blank" rel="noopener" {...rest}>{children}</a>;
}

export function TelLink({ children, ...rest }) {
  return <a href={telHref} {...rest}>{children}</a>;
}

// Aviso "Abierto ahora / Cerrado" calculado con la hora de Lima
export function Status({ className }) {
  const est = useEstadoHorario();
  return (
    <p className={className}>
      <span className="dot" style={{ background: est.color }}></span>
      <span>{est.texto}</span>
    </p>
  );
}
