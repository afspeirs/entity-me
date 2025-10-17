<script lang="ts">
  import { SettingsIcon } from '@lucide/svelte';

  import { pushState } from '$app/navigation';
  import { page } from '$app/state';
  import AppVersion from '$lib/components/AppVersion.svelte';
  import CheckForUpdate from '$lib/components/CheckForUpdate.svelte';
  import Modal from '$lib/components/Modal.svelte';
  import ThemeToggle from '$lib/components/ThemeToggle.svelte';

  // TODO: Refactor this into a store of modals to open and close the correct one
  function openSettings() {
    pushState('', {
      showModal: 'settings',
    });
  }
</script>

<button
  class="p-2 rounded-md text-white hover:bg-black/20 cursor-pointer focus-outline-inset"
  onclick={openSettings}
>
  <SettingsIcon class="size-6" aria-hidden="true" />
  <span class="sr-only">Open Settings</span>
</button>

{#if page.state.showModal === 'settings'}
  <Modal title="Settings" onclose={() => history.back()}>
    <div class="space-y-2">
      <AppVersion />
      <CheckForUpdate />
      <ThemeToggle />
    </div>
  </Modal>
{/if}
