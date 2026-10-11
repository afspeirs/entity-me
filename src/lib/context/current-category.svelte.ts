import { categories } from '#lib/entities/index.js';
import type { CategoryValue } from '#lib/entities/types.js';

const defaultValue = categories[0].value;

const STORAGE_KEY = 'current-category';

function getInitialValue(): CategoryValue {
  if (typeof window === 'undefined') return defaultValue;

  const value = window.localStorage.getItem(STORAGE_KEY) as CategoryValue | null;
  return value || defaultValue;
}

export const currentCategory = $state({
  value: getInitialValue(),
  set(value: CategoryValue) {
    this.value = value;
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(STORAGE_KEY, value);
  },
});
