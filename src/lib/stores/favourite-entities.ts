import type { Entity } from '$lib/entities/types';
import { writable } from 'svelte/store';

const initialValue = JSON.parse(window.localStorage.getItem('favourite-entities') || '[]') as Entity['description'][];
export const favouriteEntities = writable(initialValue);

favouriteEntities.subscribe((value) => window.localStorage.setItem('favourite-entities', JSON.stringify(value)));
