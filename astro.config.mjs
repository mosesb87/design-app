import { defineConfig } from 'astro/config';

// Static build that behaves identically on Apache (cPanel) and Vercel:
// /work/asas-studio/ → dist/work/asas-studio/index.html
export default defineConfig({
  site: 'https://mousabatarseh.com',
  trailingSlash: 'always',
  build: { format: 'directory', inlineStylesheets: 'auto', assets: '_assets' },
  compressHTML: true,
  devToolbar: { enabled: false },
  vite: {
    build: { assetsInlineLimit: 2048, cssMinify: 'lightningcss' },
  },
});
