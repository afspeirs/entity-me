import { writable } from 'svelte/store';

export const beforeInstallPrompt = writable<Event | null>(null);
export const updateAvailable = writable(false);
