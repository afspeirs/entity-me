import { writable } from 'svelte/store';

export const favouriteEntities = writable(JSON.parse(localStorage.getItem('favourite-entities')) || []);

favouriteEntities.subscribe((value) => localStorage.setItem('favourite-entities', JSON.stringify(value)));
