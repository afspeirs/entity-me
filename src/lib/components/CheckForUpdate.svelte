<script lang="ts">
  import { RefreshCwIcon as RefreshIcon, RocketIcon } from '@lucide/svelte';

  import Button from '#lib/components/Button.svelte';
  import { updateAvailable } from '#lib/context/service-worker.svelte.js';

  let loading = $state(false);

  function updateServiceWorker() {
    if ('serviceWorker' in window.navigator) {
      window.navigator.serviceWorker.ready.then((registration) => registration.update());
    } else {
      setTimeout(() => window.location.reload(), 1500);
    }
  }

  function handleCheckForUpdate() {
    if (updateAvailable.value) {
      updateAvailable.value(true);
    } else if (!loading) {
      loading = true;
      updateServiceWorker();
      setTimeout(() => loading = false, 2000);
    }
  }
</script>

{#snippet secondaryAction()}
  {#if updateAvailable.value}
    <span class="px-3 py-1.5 rounded-full bg-primary text-white">Update</span>
  {:else}
    <div
      aria-live="polite"
      aria-busy={loading}
      class:hidden={!loading}
    >
      <RefreshIcon class="size-5 animate-spin" aria-hidden="true" />
      <span class="sr-only">Loading</span>
    </div>
  {/if}
{/snippet}

<Button
  colour="primaryHover"
  icon={RocketIcon}
  onclick={handleCheckForUpdate}
  {secondaryAction}
>
  Check for update
</Button>
