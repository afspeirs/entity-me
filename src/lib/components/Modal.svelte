<script lang="ts">
  import Icon from '@iconify/svelte';
  import { onMount } from 'svelte';

  export let title = '';

  let dialog: HTMLDialogElement;

  function handleClose() {
    dialog.close();
  }

  onMount(() => dialog.showModal());
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<dialog
  bind:this={dialog}
  class="w-full max-w-96 min-h-40 bg-white dark:bg-dark dark:text-white rounded-md"
  on:close
  on:click|self={handleClose}
>
  <div class="p-4 select-none">
    <header class="flex items-center">
      <h2 class="flex-1 text-xl">
        {title}
      </h2>

      <button
        type="button"
        class="inline-flex justify-center rounded-md p-2 text-sm font-medium text-dark hover:bg-black/5 dark:text-white dark:hover:bg-white/5 focus-visible ring-inset"
        on:click={handleClose}
      >
        <Icon icon="lucide:x" class="size-6" aria-hidden="true" />
        <span class="sr-only">Close Modal</span>
      </button>
    </header>

    <hr class="my-2">

    <slot />
  </div>
</dialog>

<style>
  dialog::backdrop {
    @apply bg-primary/70 backdrop-blur-sm;
  }
  dialog[open] {
    animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  }
  dialog[open]::backdrop {
    animation: fade 0.2s ease-out;
  }
  @keyframes fade {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  @keyframes zoom {
    from {
      transform: scale(0.95);
    }
    to {
      transform: scale(1);
    }
  }
</style>
