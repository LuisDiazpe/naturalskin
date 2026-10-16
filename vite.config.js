import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// En `npm run build` el sitio se sirve desde https://luisdiazpe.github.io/naturalskin/
// Dos páginas: la landing (/) y el panel interno de citas (/panel/).
export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/naturalskin/' : '/',
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        panel: resolve(import.meta.dirname, 'panel/index.html'),
      },
    },
  },
}));
