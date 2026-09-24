import { defineConfig } from 'vite';
import { resolve } from 'node:path';

export default defineConfig({
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
