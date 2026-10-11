import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import { SvelteKitPWA } from '@vite-pwa/sveltekit';
import { defineConfig } from 'vite';

import packageJson from './package.json' with { type: 'json' };

export default defineConfig({
  define: {
    // 'import.meta.env.APP_BUILD_DATE': `'${new Date().toISOString()}'`,
    'import.meta.env.APP_VERSION': JSON.stringify(packageJson.version),
  },
  plugins: [
    tailwindcss(),
    sveltekit({
      // Consult https://svelte.dev/docs/kit/integrations#preprocessors
      // for more information about preprocessors
      preprocess: [vitePreprocess()],
      adapter: adapter(),
      serviceWorker: { register: false },
    }),

    SvelteKitPWA({
      registerType: 'prompt',
      strategies: 'generateSW',
      srcDir: 'src',
      filename: 'service-worker.js',
    }),
  ],
});
