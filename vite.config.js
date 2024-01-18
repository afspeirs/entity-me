import { svelte } from '@sveltejs/vite-plugin-svelte';
import { readFileSync } from 'fs';
import { defineConfig } from 'vite';

const appVersion = readFileSync('./.version', { encoding: 'utf8' }).replace('\n', '') || 'N/A';

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    'import.meta.env.APP_VERSION': JSON.stringify(appVersion),
  },
  plugins: [
    svelte(),
  ],
});
