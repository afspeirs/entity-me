import { categories } from '$lib/entities';
import type { CategoryValue } from '$lib/entities/types';

const defaultValue = categories[0].value;
const initialValue = localStorage.getItem('current-category') as CategoryValue;

export const currentCategory = $state({
  value: initialValue || defaultValue,
  set(value: CategoryValue) {
    this.value = value;
    localStorage.setItem('current-category', value);
  },
});
