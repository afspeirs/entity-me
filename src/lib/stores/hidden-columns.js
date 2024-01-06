import { writable } from 'svelte/store';

export const hiddenColumns = writable(JSON.parse(localStorage.getItem('hidden-columns')) || ['note']);

hiddenColumns.subscribe((value) => localStorage.setItem('hidden-columns', JSON.stringify(value)));
