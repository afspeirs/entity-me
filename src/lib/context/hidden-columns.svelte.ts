import type { Heading } from '$lib/entities/types';

const defaultValue = ['note'];
const initialValue = JSON.parse(localStorage.getItem('hidden-columns') || JSON.stringify(defaultValue)) as Heading[];

export const hiddenColumns = $state({
  value: initialValue,
  set(value: Heading[]) {
    this.value = value;
    window.localStorage.setItem('hidden-columns', JSON.stringify(value));
  },
});
