import { writable } from 'svelte/store';

export const beforeInstallPrompt = writable(null);
export const updateAvailable = writable(false);
