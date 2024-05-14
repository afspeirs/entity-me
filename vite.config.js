import { svelte } from '@sveltejs/vite-plugin-svelte';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import { defineConfig } from 'vite';

const appVersion = readFileSync('./.version', { encoding: 'utf8' }).trim() || 'N/A';

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    'import.meta.env.APP_VERSION': JSON.stringify(appVersion),
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
