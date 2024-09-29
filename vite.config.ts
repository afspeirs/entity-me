import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
import { SvelteKitPWA } from '@vite-pwa/sveltekit';

import { version } from './package.json';

export default defineConfig({
  define: {
    // 'import.meta.env.APP_BUILD_DATE': `'${new Date().toISOString()}'`,
    'import.meta.env.APP_VERSION': JSON.stringify(version),
  },
  plugins: [
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
