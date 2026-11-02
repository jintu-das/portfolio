// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://jintu.netlify.app',
  // Netlify serves /path/index.html at /path/, so URLs and canonicals always end in a slash.
  trailingSlash: 'always',
  build: {
    format: 'directory'
  },
  vite: {
    plugins: [tailwindcss()]
  }
});
