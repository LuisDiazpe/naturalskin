// Conexión a WhatsApp con Baileys (WhatsApp Web, no oficial).
// La sesión se guarda en `carpetaSesion`: si la borras, hay que volver a escanear el QR.
import makeWASocket, { Browsers, DisconnectReason, fetchLatestBaileysVersion, useMultiFileAuthState } from 'baileys';
import pino from 'pino';
import qrcode from 'qrcode-terminal';

export function conectarWhatsApp({ carpetaSesion, onCambio = () => {} }) {
  let sock = null;
  let listo = false;

  const numeroPropio = () => sock?.user?.id?.split(/[:@]/)[0] ?? null;

  async function iniciar() {
    const { state, saveCreds } = await useMultiFileAuthState(carpetaSesion);
    const { version } = await fetchLatestBaileysVersion().catch(() => ({}));
    sock = makeWASocket({
      auth: state,
      version,
      browser: Browsers.windows('Natural Skin Bot'),
      logger: pino({ level: 'warn' }),
      markOnlineOnConnect: false
    });
    sock.ev.on('creds.update', saveCreds);
    sock.ev.on('connection.update', ({ connection, lastDisconnect, qr }) => {
      if (qr) {
        console.log('\nEscanea este código con el WhatsApp del bot: Dispositivos vinculados → Vincular un dispositivo\n');
        qrcode.generate(qr, { small: true });
      }
      if (connection === 'open') {
        listo = true;
        console.log(`✓ WhatsApp conectado como ${numeroPropio()}`);
        onCambio(true, numeroPropio());
      }
      if (connection === 'close') {
        listo = false;
        onCambio(false, numeroPropio());
        const codigo = lastDisconnect?.error?.output?.statusCode;
        if (codigo === DisconnectReason.loggedOut) {
          console.error('✗ La sesión se cerró desde el celular. Borra la carpeta de sesión y vuelve a iniciar para escanear un QR nuevo.');
          process.exit(1);
        }
        console.log(`WhatsApp desconectado (código ${codigo ?? '?'}). Reconectando en 5 s…`);
        setTimeout(() => iniciar().catch((e) => console.error('Error al reconectar:', e.message)), 5000);
      }
    });
  }

  // Envía un texto a un número con código de país (51987654321)
  async function enviar(numero, texto) {
    if (!listo) throw new Error('WhatsApp no está conectado');
    const [resultado] = (await sock.onWhatsApp(numero)) ?? [];
    if (!resultado?.exists) throw new Error('Ese número no tiene WhatsApp');
    await sock.sendMessage(resultado.jid, { text: texto });
  }

  return { iniciar, enviar, conectado: () => listo, numero: numeroPropio };
}
