# Natural Skin · Landing page

Landing page de **Natural Skin**, un centro de estética facial y corporal en Lima, Perú, que abrió hace unos 2 meses. La página sirve para que las clientas conozcan los tratamientos y **reserven por WhatsApp**. No hay tienda ni pagos online.

Idioma del sitio: **español de Perú** (`lang="es-PE"`). Trata a la clienta de "tú".

## Estado actual

`index.html`, `css/styles.css` y `js/main.js` ya forman una **referencia funcional y aprobada** del diseño. Funciona en escritorio y celular. Las capturas de cómo debe verse están en `docs/capturas/`.

**Tu trabajo es partir de esta referencia, no rediseñar.** Respeta colores, tipografías, espaciados, formas y animaciones. Si algo no está claro, consulta `docs/DISENO.md`.

## Antes de tocar nada, lee

1. `docs/DISENO.md`: sistema visual completo (tokens, tipografía, componentes, animaciones, comportamiento en celular).
2. `docs/CONTENIDO.md`: todos los textos, los tratamientos y los marcadores `[ASÍ]` que faltan.
3. `docs/PENDIENTES.md`: datos que la dueña aún no ha enviado y tareas abiertas.

## Stack

- HTML, CSS y JS vanilla, **sin frameworks ni build**. Es un sitio de una sola página y así carga rapidísimo.
- Fuentes **locales** en `assets/fonts/` (Cormorant Garamond y Jost, licencia OFL). No cargues Google Fonts.
- Si el usuario pide migrar a Astro u otro framework, conserva exactamente el mismo resultado visual.

## Reglas que no se rompen

- **Paleta cerrada.** Un solo color de acento fuerte: fucsia `#B8336A`, para botones y palabras destacadas. El dorado `#C29B3C` solo aparece en el logo y en adornos pequeños (✦, aro del sello). El lila y el amarillo cálido solo como manchas difuminadas de fondo. No agregues colores nuevos.
- **Tipografía:** títulos en Cormorant Garamond, con una palabra en *cursiva fucsia* por título. Todo lo demás en Jost.
- **Botones:** forma de píldora, mínimo 48 px de alto (52 px en celular).
- **Mobile first en la práctica:** la mayoría de las clientas entra desde el celular. Prueba siempre a 390 px de ancho, sin scroll horizontal.
- **Accesibilidad:** HTML semántico, contraste AA, `alt` en las imágenes de contenido, foco visible y respeto a `prefers-reduced-motion`.
- **No inventes datos.** Precios, descripciones, dirección y teléfonos van como marcador `[ASÍ]` hasta que el usuario los dé. Tampoco inventes reseñas, testimonios ni cifras ("+500 clientas", etc.).
- **No uses imágenes de terceros** (Canva, Freepik o webs de otras clínicas). Las fotos las tomará el negocio en su propio salón. Mientras tanto se usan los placeholders `.ph`.
- Los nombres **Hydrafacial® y NCTF® 135 HA** son marcas registradas. Déjalos solo si el negocio confirma que usa esos equipos o productos. Si no, cámbialos por un nombre genérico (ver `docs/PENDIENTES.md`). No menciones marcas de terceros como comparación (por ejemplo "tipo Liposonix").
- Los tratamientos y precios marcados ✅ en `docs/CONTENIDO.md` vienen de la dueña. Las fotos de sus notas están en `docs/notas-duena/`. No cambies esos precios sin que el usuario lo pida.

## Stack (versión React)

Este proyecto es la migración de la landing original en HTML/CSS/JS vanilla (`D:/natural-skin/natural-skin`) a **React + Vite**. El resultado visual debe ser idéntico al original.

- `index.html`: `<head>` (SEO, Open Graph, JSON-LD, preload de fuentes) y el `#root`.
- `src/styles.css`: el CSS original sin cambios (tokens en `:root`, celular en `@media max-width:768px`). Las fuentes se cargan desde `/assets/fonts/`.
- `src/components/`: una sección por componente. `ui.jsx` tiene `Icon`, `WaLink`, `TelLink` y `Status`.
- `src/data/tratamientos.js`: categorías y tratamientos. El contador de cada pestaña se calcula solo.
- `public/assets/`: fuentes (OFL) e imágenes. No cargues Google Fonts.

## Cómo se configura

En `src/config.js`, objeto `CONFIG`:
- `whatsapp`: número con código de país, sin `+` (ej. `51987654321`). Todos los `<WaLink>` se generan desde aquí. La prop `msg` define un mensaje por tratamiento (`msg` en `src/data/tratamientos.js`).
- `telefono`: para los `<TelLink>`.
- `horario`: alimenta el aviso "Abierto ahora / Cerrado", calculado con la hora de Lima (`America/Lima`).

## Imágenes

- Cada placeholder lleva un número (FOTO 1 a 10). La lista de qué fotografiar está en `docs/DISENO.md` → "Mapa de fotos".
- Para reemplazar una foto, guarda el archivo en `public/assets/img/` y pon `<img src="/assets/img/xxx.webp" alt="…" loading="lazy" width height />` dentro del `.ph`, que ya tiene `object-fit: cover`. Usa WebP, máximo unos 200 KB por foto. La foto de portada va sin `loading="lazy"`.

## Probar

`npm run dev` y revísalo a 1440 px y a 390 px. `npm run build` genera el sitio estático en `dist/`.
