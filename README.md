# Natural Skin · Landing page (React + Vite)

Sitio web de una sola página para Natural Skin, centro de estética en Lima.

## Abrir en local

```bash
npm install
npm run dev        # http://localhost:5173
```

## Estructura

```
index.html                 <head> (SEO, JSON-LD) y #root
src/main.jsx               Punto de entrada
src/App.jsx                Orden de las secciones
src/config.js              WhatsApp, teléfono y horario
src/data/tratamientos.js   Categorías y tratamientos
src/components/            Una sección por componente
src/hooks/                 Horario "abierto ahora" y aparición al hacer scroll
src/styles.css             Estilos
public/assets/             Fuentes, logos, favicons y fotos
docs/                      Diseño, contenido, pendientes y capturas de referencia
CLAUDE.md                  Instrucciones para Claude Code
```

## Publicar

`npm run build` genera `dist/`, un sitio estático que se sube tal cual a Netlify, Vercel, Cloudflare Pages o GitHub Pages.
