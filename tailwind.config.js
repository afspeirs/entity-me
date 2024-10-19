import typography from '@tailwindcss/typography';
import safeArea from 'tailwindcss-safe-area';
import {
  gray,
  neutral,
  black,
  white,
} from 'tailwindcss/colors';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{svelte,js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    colors: {
      current: 'currentColor',
      inherit: 'inherit',
      transparent: 'transparent',
      primary: '#9c27b0',
      black,
      white,
      dark: neutral[800],
      light: neutral[100],
      gray,
    },
    extend: {
      boxShadow: {
        close: '0.3rem 0.5rem 0.5rem rgba(0, 0, 0, 0.25)',
        far: '0.3rem 1rem 1rem rgba(0, 0, 0, 0.25)',
      },
      spacing: {
        'titlebar-area-x': 'env(titlebar-area-x, 0)',
        'titlebar-area-y': 'env(titlebar-area-y, 0)',
        'titlebar-area-width': 'env(titlebar-area-width, 100%)',
        'titlebar-area-height': 'env(titlebar-area-height, 16rem)',
      },
    },
  },
  plugins: [
    safeArea,
    typography,
  ],
};
