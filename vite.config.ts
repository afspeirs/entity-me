import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
import { SvelteKitPWA } from '@vite-pwa/sveltekit';
import { svelteTesting } from '@testing-library/svelte/vite';

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
    svelteTesting(),
  ],
  test: {
    environment: 'jsdom',
    include: ['src/**/*.{test,spec}.{js,ts}'],
    setupFiles: ['./vitest-setup.ts'],
    globals: true,
  },
});
