// ---------- Configuración: completar con los datos reales ----------
export const CONFIG = {
  whatsapp: '51XXXXXXXXX',          // código de país 51 + número, sin espacios ni "+"
  telefono: '+51XXXXXXXXX',          // para el enlace tel:
  mensajeWhatsApp: 'Hola Natural Skin, quiero reservar una evaluación.',
  zonaHoraria: 'America/Lima',
  // 0 = domingo … 6 = sábado. null = cerrado. 'cita' = solo con cita previa.
  horario: {
    0: 'cita',
    1: [9, 19], 2: [9, 19], 3: [9, 19], 4: [9, 19],
    5: [9, 17],
    6: null
  }
};

export const waHref = (msg = CONFIG.mensajeWhatsApp) =>
  `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(msg)}`;

export const telHref = `tel:${CONFIG.telefono}`;

// Ruta a una imagen de public/assets/img/ (respeta la base de Vite, p. ej. /naturalskin/ en GitHub Pages)
export const img = (nombre) => `${import.meta.env.BASE_URL}assets/img/${nombre}`;
