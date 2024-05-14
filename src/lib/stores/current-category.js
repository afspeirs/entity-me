import { writable } from 'svelte/store';
import { categories } from '$lib/entities';

export const currentCategory = writable(localStorage.getItem('current-category') || categories[0].value);

// currentCategory.subscribe((value) => localStorage.setItem('current-category', value));
