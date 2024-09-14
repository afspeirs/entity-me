import { svelte } from '@sveltejs/vite-plugin-svelte';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import { defineConfig } from 'vite';

import { version } from './package.json';

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    'import.meta.env.APP_VERSION': JSON.stringify(version),
  },
  plugins: [
    svelte(),
  ],
  resolve: {
    alias: {
      '$lib': resolve(__dirname, './src/lib'),
    },
  },
});
