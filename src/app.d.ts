import 'vite-plugin-pwa/svelte';
import 'vite-plugin-pwa/info';

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
  namespace App {
    // interface Error {}
    // interface Locals {}
    // interface PageData {}
    interface PageState {
      // TODO: update this type to get the names of the modals
      showModal?: string;
    }
    // interface Platform {}
  }
}

export {};
