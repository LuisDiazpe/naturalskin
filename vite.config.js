import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// En `npm run build` el sitio se sirve desde https://luisdiazpe.github.io/naturalskin/
export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/naturalskin/' : '/',
  plugins: [react()],
}));
