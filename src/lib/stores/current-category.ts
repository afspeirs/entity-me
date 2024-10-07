import { writable } from 'svelte/store';
import { categories } from '$lib/entities';
import type { CategoryValue } from '$lib/entities/types';

const defaultValue = categories[0].value;
const initialValue = localStorage.getItem('current-category') as CategoryValue;
export const currentCategory = writable(initialValue || defaultValue);

currentCategory.subscribe((value) => localStorage.setItem('current-category', value));
