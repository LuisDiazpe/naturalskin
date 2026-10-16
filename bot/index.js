// Bot de WhatsApp de Natural Skin.
// Envía la cola de avisos (confirmaciones, reprogramaciones, recordatorios) y avisa al panel si está conectado.
import { createClient } from '@supabase/supabase-js';
import { conectarWhatsApp } from './whatsapp.js';
import { procesarAvisos, programarRecordatorios } from './avisos.js';

const { SUPABASE_URL, SUPABASE_SECRET_KEY, SOLO_NUMEROS = '', CARPETA_SESION = './sesion' } = process.env;
if (!SUPABASE_URL || !SUPABASE_SECRET_KEY) {
  console.error('Falta SUPABASE_URL o SUPABASE_SECRET_KEY en bot/.env (copia .env.example).');
  process.exit(1);
}

const soloNumeros = SOLO_NUMEROS.split(',').map((n) => n.replace(/\D/g, '')).filter(Boolean);
const db = createClient(SUPABASE_URL, SUPABASE_SECRET_KEY, { auth: { persistSession: false } });

async function reportarEstado(conectado, numero) {
  const { error } = await db.from('bot_estado')
    .update({ conectado, numero, ultima_senal: new Date().toISOString() }).eq('id', 1);
  if (error) console.error('No se pudo actualizar bot_estado:', error.message);
}

const wa = conectarWhatsApp({ carpetaSesion: CARPETA_SESION, onCambio: reportarEstado });

// Un ciclo a la vez: si uno tarda, el siguiente espera
let ocupado = false;
async function ciclo() {
  if (ocupado || !wa.conectado()) return;
  ocupado = true;
  try {
    await programarRecordatorios({ db });
    await procesarAvisos({ db, enviar: wa.enviar, soloNumeros });
  } catch (e) {
    console.error('Error en el ciclo:', e.message);
  } finally {
    ocupado = false;
  }
}

console.log('Natural Skin · bot de WhatsApp');
if (soloNumeros.length) console.log(`MODO PRUEBA: solo se envían mensajes a ${soloNumeros.join(', ')}`);
await wa.iniciar();
setInterval(ciclo, 10_000);                                              // revisa la cola cada 10 s
setInterval(() => reportarEstado(wa.conectado(), wa.numero()), 60_000);  // latido para el panel

const salir = async () => { await reportarEstado(false, wa.numero()); process.exit(0); };
process.on('SIGINT', salir);
process.on('SIGTERM', salir);
