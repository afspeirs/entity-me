import { useRegisterSW } from 'virtual:pwa-register/svelte';
import { addToast } from '$lib/components/Toaster.svelte';
import { updateAvailable } from '$lib/context/service-worker.svelte';

const { updateServiceWorker } = useRegisterSW({
  onNeedRefresh() {
    console.log('SW: A new version is available'); // eslint-disable-line no-console
    addToast({
      id: 'sw:update-available',
      data: {
        title: 'A new version is available',
        action: {
          title: 'Update',
          onclick: () => updateServiceWorker(true),
        },
      },
    });
    updateAvailable.set(updateServiceWorker);
  },
  onOfflineReady() {
    console.log('SW: Caching complete! Now available offline'); // eslint-disable-line no-console
    addToast({
      id: 'sw:caching-complete',
      data: {
        title: 'Caching complete! Now available offline',
      },
    });
  },
  onRegistered(r) {
    console.log('SW Registered:', r?.scope); // eslint-disable-line no-console
  },
  onRegisterError(error) {
    console.log('SW registration error:', error); // eslint-disable-line no-console
  },
});
