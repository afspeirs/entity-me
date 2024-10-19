import { toast } from '@zerodevx/svelte-toast';
import { useRegisterSW } from 'virtual:pwa-register/svelte';
import { updateAvailable } from '$lib/stores/service-worker';

const { updateServiceWorker } = useRegisterSW({
  onNeedRefresh() {
    console.log('SW: A new version is available');
    toast.push('A new version is available');
    updateAvailable.set(updateServiceWorker);
  },
  onOfflineReady() {
    console.log('SW: Caching complete! Now available offline');
    toast.push('Caching complete! Now available offline');
  },
  onRegistered(r) {
    console.log('SW Registered:', r?.scope);
  },
  onRegisterError(error) {
    console.log('SW registration error:', error);
  },
});
