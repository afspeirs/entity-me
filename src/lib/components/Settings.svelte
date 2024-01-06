<script>
  import Icon from '@iconify/svelte';

  import InputCurrentCategory from './InputCurrentCategory.svelte';
  import InputHiddenColumns from './InputHiddenColumns.svelte';
  import Modal from './Modal.svelte';

  let showModal = false;
</script>

<button
  type="button"
  on:click={() => (showModal = true)}
  class="rounded-md p-1 focus-visible"
>
  <span class="sr-only">Open Settings</span>
  <Icon icon="heroicons:cog-6-tooth" class="w-8 h-8" />
</button>

<Modal bind:showModal>
  <h2 slot="header" class="mb-4 text-2xl">
    Settings
  </h2>

  <InputCurrentCategory />
  <InputHiddenColumns />
</Modal>
