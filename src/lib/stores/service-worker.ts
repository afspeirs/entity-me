import { writable } from 'svelte/store';

type UpdateAvailable = false | ((reloadPage?: boolean) => Promise<void>);

export const beforeInstallPrompt = writable<Event | null>(null);
export const updateAvailable = writable<UpdateAvailable>(false);
