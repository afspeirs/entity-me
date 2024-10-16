<script lang="ts">
  import Icon from '@iconify/svelte';
  import { pushState } from '$app/navigation';
  import { page } from '$app/stores';

  import Modal from '$lib/components/Modal.svelte';
  import { updateAvailable } from '$lib/stores/service-worker';
  import { themeSystem, themeUser, themeUserOptions } from '$lib/stores/theme';

  let loading = false;

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
      setTimeout(() => (loading = false), 2000);
    }
  }

  function handleUpdateTheme() {
    themeUser.set($themeSystem === 'dark' ? 'light' : 'dark');
  }
</script>

<button
  class="rounded-md p-2 text-white hover:bg-black/20 focus-visible ring-inset"
  on:click={openSettings}
>
  <Icon icon="lucide:settings" class="size-6" aria-hidden="true" />
  <span class="sr-only">Open Settings</span>
</button>


{#if $page.state.showModal === 'settings'}
  <Modal title="Settings" on:close={() => history.back()}>
    <div class="space-y-2">
      <div class="flex rounded-md items-center w-full p-2 gap-2 text-sm text-gray-900 dark:text-white">
        <Icon icon="lucide:wrench" class="size-5" aria-hidden="true" />
        <span>Version</span>
        <span class="ml-auto">{import.meta.env.APP_VERSION}</span>
      </div>

      <button
        type="button"
        on:click={handleCheckForUpdate}
        class="flex rounded-md items-center w-full p-2 gap-2 text-sm hover:bg-black/5 dark:hover:bg-white/5 text-gray-900 dark:text-white"
      >
        <Icon icon="lucide:rocket" class="size-5" aria-hidden="true" />
        <span>Check for update</span>
        <span class="ml-auto">
          {#if $updateAvailable}
            Update
          {:else}
            <div
              aria-busy={loading}
              aria-live="polite"
              class:hidden={!loading}
            >
              <Icon icon="lucide:refresh-cw" class="size-5 animate-spin text-gray-900 dark:text-white" aria-hidden="true" />
              <span class="sr-only">Loading</span>
            </div>
          {/if}
        </span>
      </button>

      <button
        type="button"
        on:click={handleUpdateTheme}
        class="flex rounded-md items-center w-full p-2 gap-2 text-sm hover:bg-black/5 dark:hover:bg-white/5 text-gray-900 dark:text-white"
      >
        <Icon icon={`lucide:${$themeSystem === 'dark' ? 'moon' : 'sun'}`} class="size-5" aria-hidden="true" />
        <span>Theme</span>
        <span class="ml-auto">{themeUserOptions[$themeSystem]}</span>
      </button>
    </div>
  </Modal>
{/if}
