// Comunicación del panel con el bot de WhatsApp: la cola `avisos` y el latido `bot_estado`.
import { useEffect, useState } from 'react';
import { supabase } from './supabase';

const canal = (nombre) => `${nombre}-${Math.random().toString(36).slice(2)}`;

// Deja un mensaje en cola; el bot lo envía en segundos si está conectado
export async function encolarAviso(citaId, tipo) {
  return supabase.from('avisos').insert({ cita_id: citaId, tipo });
}

// Vuelve a intentar un aviso que falló
export async function reintentarAviso(id) {
  return supabase.from('avisos').update({ error: null }).eq('id', id);
}

// ¿Está el bot conectado? (señal en los últimos 3 minutos)
export function useBotEstado() {
  const [estado, setEstado] = useState(null);
  useEffect(() => {
    const cargar = () => supabase.from('bot_estado').select('conectado, numero, ultima_senal').eq('id', 1).maybeSingle()
      .then(({ data }) => setEstado(data ?? { conectado: false }));
    cargar();
    const intervalo = setInterval(cargar, 60_000);
    const sub = supabase.channel(canal('bot-estado'))
      .on('postgres_changes', { event: '*', schema: 'public', table: 'bot_estado' }, cargar)
      .subscribe();
    return () => { clearInterval(intervalo); supabase.removeChannel(sub); };
  }, []);
  const activo = Boolean(estado?.conectado && estado.ultima_senal && Date.now() - new Date(estado.ultima_senal) < 3 * 60_000);
  return { cargado: estado !== null, activo, numero: estado?.numero };
}

// Avisos de una cita, actualizados en tiempo real
export function useAvisos(citaId) {
  const [avisos, setAvisos] = useState([]);
  useEffect(() => {
    const cargar = () => supabase.from('avisos').select('id, tipo, creado_en, enviado_en, via, error')
      .eq('cita_id', citaId).order('creado_en', { ascending: false })
      .then(({ data }) => setAvisos(data ?? []));
    cargar();
    const sub = supabase.channel(canal(`avisos-${citaId}`))
      .on('postgres_changes', { event: '*', schema: 'public', table: 'avisos', filter: `cita_id=eq.${citaId}` }, cargar)
      .subscribe();
    const intervalo = setInterval(cargar, 15_000); // por si el tiempo real se corta
    return () => { clearInterval(intervalo); supabase.removeChannel(sub); };
  }, [citaId]);
  return avisos;
}
