import { defineConfig } from 'vite';
import { resolve } from 'node:path';

// Served from a sub-path of the portfolio domain: https://mousabatarseh.com/sapienceai/
// Every asset, font and page URL is emitted under this base.
export default defineConfig({
  base: '/sapienceai/',
  build: {
    target: 'es2022',
    cssCodeSplit: false,
    assetsInlineLimit: 0,
    rollupOptions: {
      input: {
        index: resolve(import.meta.dirname, 'index.html'),
        notes: resolve(import.meta.dirname, 'notes.html'),
        missing: resolve(import.meta.dirname, '404.html'),
      },
    },
  },
  server: { host: true },
});
