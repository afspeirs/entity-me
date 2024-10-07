import type { Heading } from '$lib/entities/types';
import { writable } from 'svelte/store';

const defaultValue = ['note'];
const initialValue = JSON.parse(localStorage.getItem('hidden-columns') || JSON.stringify(defaultValue)) as Heading[];
export const hiddenColumns = writable(initialValue);

hiddenColumns.subscribe((value) => localStorage.setItem('hidden-columns', JSON.stringify(value)));
