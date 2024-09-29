import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';

import { version } from './package.json';

export default defineConfig({
  define: {
    'import.meta.env.APP_VERSION': JSON.stringify(version),
  },
  plugins: [
    sveltekit(),
  ],
  test: {
    include: ['src/**/*.{test,spec}.{js,ts}'],
  },
});
