// TODO: turn this into a lazy import
import { Workbox } from 'workbox-window';

export function registerServiceWorker() {
  if ('serviceWorker' in navigator && import.meta.env.PROD) {
    const wb = new Workbox('/service-worker.js');

    wb.addEventListener('installed', () => {
      if (navigator.serviceWorker.controller) {
        // New Content Available event
        const event = new Event('swNewContentAvailable');
        window.dispatchEvent(event);
      } else {
        // Content Cached event
        const event = new Event('swContentCached');
        window.dispatchEvent(event);
      }
    });

    wb.register();
  }
}
