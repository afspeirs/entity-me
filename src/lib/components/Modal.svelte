<script>
  import Icon from '@iconify/svelte';

  export let showModal = false;

  /** @type HTMLDialogElement */
  let dialog;

  $: if (dialog && showModal) dialog.showModal();
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<dialog
  bind:this={dialog}
  on:close={() => (showModal = false)}
  on:click|self={() => dialog.close()}
  class="max-w-lg p-4 border-none select-none"
>
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div on:click|stopPropagation>
    <slot name="header" />

    <!-- svelte-ignore a11y-autofocus -->
    <button
      type="button"
      autofocus
      on:click={() => dialog.close()}
      class="absolute top-2 right-2 bg-white rounded focus-visible"
    >
      <span class="sr-only">close modal</span>
      <Icon icon="heroicons:x-mark" class="w-8 h-8" />
    </button>

    <hr />

    <slot />
  </div>
</dialog>

<style>
  dialog::backdrop {
    @apply bg-primary/70;
  }
  dialog[open] {
    animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  }
  @keyframes zoom {
    from {
      transform: scale(0.95);
    }
    to {
      transform: scale(1);
    }
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
</style>
