<script lang="ts">
  import { SettingsIcon } from '@lucide/svelte';

  import AppVersion from '#lib/components/AppVersion.svelte';
  import CheckForUpdate from '#lib/components/CheckForUpdate.svelte';
  import Modal from '#lib/components/Modal.svelte';
  import ThemeToggle from '#lib/components/ThemeToggle.svelte';
  import { modals } from '#lib/context/modals.svelte.js';
</script>

<button
  class="p-2 rounded-md text-white hover:bg-black/20 cursor-pointer focus-outline-inset"
  onclick={() => modals.open('settings')}
>
  <SettingsIcon class="size-6" aria-hidden="true" />
  <span class="sr-only">Open Settings</span>
</button>

{#if modals.isOpen('settings')}
  <Modal title="Settings" onclose={modals.close}>
    <div class="space-y-2">
      <AppVersion />
      <CheckForUpdate />
      <ThemeToggle />
    </div>
  </Modal>
{/if}
