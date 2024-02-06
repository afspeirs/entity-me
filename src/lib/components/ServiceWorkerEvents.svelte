<script>
  import { toast } from '@zerodevx/svelte-toast'

  import { beforeInstallPrompt, updateAvailable } from '../stores/service-worker';

  function swBeforeInstallPrompt(event) {
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
</script>

<svelte:window
  on:beforeinstallprompt={swBeforeInstallPrompt}
  on:swNewContentAvailable={swNewContentAvailable}
  on:swContentCached={swContentCached}
/>
