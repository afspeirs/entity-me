<script lang="ts">
  import type { Action } from 'svelte/action';
  import { toast } from '@zerodevx/svelte-toast'

  import { beforeInstallPrompt, updateAvailable } from '$lib/stores/service-worker';

  function swBeforeInstallPrompt(event: Event) {
    event.preventDefault();
    beforeInstallPrompt.set(event);
  }

  function swNewContentAvailable() {
    updateAvailable.set(true);
    toast.push('A new version is available');
  }

  function swContentCached() {
    toast.push('Caching complete! Now available offline');
  }

  const useServiceWorkerEvents: Action = (node) => {
    node.addEventListener('beforeinstallprompt', swBeforeInstallPrompt);
    node.addEventListener('swNewContentAvailable', swNewContentAvailable);
    node.addEventListener('swContentCached', swContentCached);

    return {
      destroy() {
        node.removeEventListener('beforeinstallprompt', swBeforeInstallPrompt);
        node.removeEventListener('swNewContentAvailable', swNewContentAvailable);
        node.removeEventListener('swContentCached', swContentCached);
      },
    }
  }
</script>

<svelte:window
  use:useServiceWorkerEvents
/>
