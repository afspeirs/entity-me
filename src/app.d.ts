import 'vite-plugin-pwa/svelte';
import 'vite-plugin-pwa/info';
import type { ModalName } from '#lib/context/modals.svelte.js';

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
  namespace App {
    // interface Error {}
    // interface Locals {}
    // interface PageData {}
    interface PageState {
      showModal?: ModalName;
    }
    // interface Platform {}
  }
}

export {};
