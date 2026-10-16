# Bot de WhatsApp · Natural Skin

Envía por WhatsApp, sin intervención, los mensajes que el panel deja en la tabla `avisos`:

- **Confirmación** al crear una cita en el panel (casilla marcada por defecto).
- **Reprogramación** al cambiar la fecha u hora de una cita (lo encola la base de datos sola).
- **Recordatorio** el día antes, entre 8 a. m. y 8 p. m. (si la cita se reservó con más de 12 h de anticipación).
- Botones "Enviar confirmación / recordatorio" en el detalle de la cita.

Usa [Baileys](https://github.com/WhiskeySockets/Baileys) (WhatsApp Web, **no oficial**): WhatsApp puede bloquear el número. Prueba primero con un número que no sea el del negocio.

## Primera vez

```bash
cd bot
npm install
copy .env.example .env      # en Windows (en Mac/Linux: cp)
```

Abre `bot/.env` y pega la **Secret key** de Supabase (Project Settings → API Keys → `sb_secret_...`) en `SUPABASE_SECRET_KEY`. Es secreta: no la compartas ni la subas a GitHub (`.env` ya está en `.gitignore`).

Para probar sin riesgo, pon tu propio número en `SOLO_NUMEROS=51XXXXXXXXX`: el bot solo enviará a ese número y marcará los demás avisos como omitidos.

## Encenderlo

```bash
cd bot
npm start
```

La primera vez sale un **código QR** en la terminal: en el celular del bot abre WhatsApp → Dispositivos vinculados → Vincular un dispositivo, y escanéalo. La sesión queda guardada en `bot/sesion/` y las siguientes veces no pide QR.

El panel muestra arriba **"Bot WhatsApp conectado"** mientras esté encendido. Si se apaga, los mensajes quedan **en cola** y se envían cuando vuelva a encenderse (los de citas que ya pasaron se omiten).

## Pruebas

```bash
npm test
```
