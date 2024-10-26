import '@testing-library/jest-dom/vitest';

Object.defineProperty(window, 'matchMedia', {
  value: () => ({
    matches: false,
    addEventListener: () => {},
    removeEventListener: () => {},
  }),
});
