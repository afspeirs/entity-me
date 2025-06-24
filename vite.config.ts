import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import { SvelteKitPWA } from '@vite-pwa/sveltekit';
import { defineConfig } from 'vitest/config';

import { version } from './package.json';

export default defineConfig({
  define: {
    // 'import.meta.env.APP_BUILD_DATE': `'${new Date().toISOString()}'`,
    'import.meta.env.APP_VERSION': JSON.stringify(version),
  },
  plugins: [
    tailwindcss(),
    sveltekit(),
    SvelteKitPWA({
      registerType: 'prompt',
      strategies: 'generateSW',
      srcDir: 'src',
      filename: 'service-worker.js',
    }),
  ],
  test: {
    include: ['src/**/*.{test,spec}.{js,ts}'],
  },
});
