import { svelte } from '@sveltejs/vite-plugin-svelte';
import { defineConfig } from 'vite';
import { version } from './package.json';

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    'import.meta.env.APP_VERSION': JSON.stringify(version || ''),
  },
  plugins: [
    svelte(),
  ],
});
