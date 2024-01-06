import { writable } from 'svelte/store';

export const currentCategory = writable(localStorage.getItem('current-category') || 'latinBasic');

// currentCategory.subscribe((value) => localStorage.setItem('current-category', value));
