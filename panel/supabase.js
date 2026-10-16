import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY
);

// Campos de una cita con su clienta y su servicio
export const SELECT_CITA =
  'id, inicio, fin, estado, origen, notas, creado_en, cliente_id, servicio_id, clientes(nombre, telefono), servicios(nombre, precio, duracion_min)';

// Mensaje entendible para errores comunes de la base de datos
export function mensajeError(error) {
  if (!error) return '';
  if (error.code === '23P01') return 'Ese horario se cruza con otra cita activa.';
  if (error.code === '23514') return 'Hay un dato con formato inválido (revisa el teléfono o las horas).';
  if (error.code === '42501' || error.code === 'PGRST301') return 'Tu usuario no tiene permiso. Pide que te agreguen a la tabla "personal".';
  if (error.message === 'Invalid login credentials') return 'Correo o contraseña incorrectos.';
  return error.message;
}

// 987654321 / +51 987 654 321 → 51987654321
export function normalizarTelefono(t) {
  const d = String(t).replace(/\D/g, '');
  return d.length === 9 && d.startsWith('9') ? `51${d}` : d;
}

// Celular peruano (51 + 9 dígitos que empiezan en 9) o número internacional completo
export const telefonoValido = (t) => /^519\d{8}$/.test(t) || (!t.startsWith('51') && /^\d{10,15}$/.test(t));

export const formatoTelefono = (t) =>
  t?.startsWith('51') && t.length === 11 ? `${t.slice(2, 5)} ${t.slice(5, 8)} ${t.slice(8)}` : t;
