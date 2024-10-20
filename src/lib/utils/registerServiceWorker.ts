import { useRegisterSW } from 'virtual:pwa-register/svelte';
import { toast } from '$lib/components/Toaster.svelte';
import { updateAvailable } from '$lib/stores/service-worker';

const { updateServiceWorker } = useRegisterSW({
  onNeedRefresh() {
    console.log('SW: A new version is available');
    toast.add({ title: 'A new version is available' });
    updateAvailable.set(updateServiceWorker);
  },
  onOfflineReady() {
    console.log('SW: Caching complete! Now available offline');
    toast.add({ title: 'Caching complete! Now available offline' });
  },
  onRegistered(r) {
    console.log('SW Registered:', r?.scope);
  },
  onRegisterError(error) {
    console.log('SW registration error:', error);
  },
});
