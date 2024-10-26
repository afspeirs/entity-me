<script lang="ts">
  import Icon from '@iconify/svelte';
  import { pushState } from '$app/navigation';
  import { page } from '$app/stores';

  import Button from '$lib/components/Button.svelte';
  import Modal from '$lib/components/Modal.svelte';
  import { updateAvailable } from '$lib/stores/service-worker';
  import { themeSystem, themeUser, themeUserOptions } from '$lib/stores/theme';

  let loading = $state(false);

  // TODO: Refactor this into a store of modals to open and close the correct one
  function openSettings() {
    pushState('', {
      showModal: 'settings',
    });
  }

  function updateServiceWorker() {
    if ('serviceWorker' in window.navigator) {
      window.navigator.serviceWorker.ready.then((registration) => registration.update());
    } else {
      setTimeout(() => window.location.reload(), 1500);
    }
  }

  function handleCheckForUpdate() {
    if ($updateAvailable) {
      $updateAvailable();
    } else if (!loading) {
      loading = true;
      updateServiceWorker();
      setTimeout(() => loading = false, 2000);
    }
  }

  function handleUpdateTheme() {
    themeUser.set($themeSystem === 'dark' ? 'light' : 'dark');
  }
</script>

<button
  class="p-2 rounded-md text-white hover:bg-black/20 focus-visible ring-inset"
  onclick={openSettings}
>
  <Icon icon="lucide:settings" class="size-6" aria-hidden="true" />
  <span class="sr-only">Open Settings</span>
</button>

{#if $page.state?.showModal === 'settings'}
  <Modal title="Settings" onclose={() => history.back()}>
    <div class="space-y-2">
      <div class="flex items-center w-full gap-2 text-gray-900 dark:text-white p-2 text-sm">
        <Icon icon="lucide:wrench" class="size-5" aria-hidden="true" />
        <span>Version</span>
        <span class="ml-auto">{import.meta.env.APP_VERSION}</span>
      </div>

      <Button
        icon="rocket"
        text="Check for update"
        onclick={handleCheckForUpdate}
      >
        <span class="ml-auto">
          {#if $updateAvailable}
            Update
          {:else}
            <div
              aria-busy={loading}
              aria-live="polite"
              class:hidden={!loading}
            >
              <Icon icon="lucide:refresh-cw" class="size-5 animate-spin" aria-hidden="true" />
              <span class="sr-only">Loading</span>
            </div>
          {/if}
        </span>
      </Button>

      <Button
        icon={$themeSystem === 'dark' ? 'moon' : 'sun'}
        text="Theme"
        onclick={handleUpdateTheme}
      >
        <span class="ml-auto">{themeUserOptions[$themeSystem]}</span>
      </Button>
    </div>
  </Modal>
{/if}
