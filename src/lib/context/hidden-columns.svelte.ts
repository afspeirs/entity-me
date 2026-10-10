import type { Heading } from '$lib/entities/types';

const defaultValue: Heading[] = ['note'];

const STORAGE_KEY = 'hidden-columns';

function getInitialValue(): Heading[] {
  if (typeof window === 'undefined') return defaultValue;

  const value = window.localStorage.getItem(STORAGE_KEY);
  if (!value) return defaultValue;
  return JSON.parse(value) as Heading[];
}

export const hiddenColumns = $state({
  value: getInitialValue(),
  set(value: Heading[]) {
    this.value = value;
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
  },
});
