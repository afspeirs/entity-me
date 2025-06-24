<script lang="ts">
  import { XIcon } from 'lucide-svelte';
  import { onMount, type Snippet } from 'svelte';

  type ModalProps = {
    children: Snippet;
    title: string;
    onclose: () => void;
  };

  const {
    children,
    title,
    onclose,
  }: ModalProps = $props();

  let dialog: HTMLDialogElement;

  function handleClose() {
    dialog.close();
  }

  onMount(() => dialog.showModal());
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<dialog
  bind:this={dialog}
  class="m-auto w-full max-w-96 min-h-40 bg-white dark:bg-dark dark:text-white rounded-md"
  onclick={(event) => event.target === event.currentTarget && handleClose()}
  {onclose}
>
  <div class="p-4 select-none">
    <header class="flex items-center">
      <h2 class="flex-1 text-xl">
        {title}
      </h2>

      <button
        type="button"
        class="inline-flex justify-center p-2 text-sm font-medium text-dark hover:bg-black/5 dark:text-white dark:hover:bg-white/5 rounded-md cursor-pointer focus-visible ring-inset"
        onclick={handleClose}
      >
        <XIcon class="size-6" aria-hidden="true" />
        <span class="sr-only">Close Modal</span>
      </button>
    </header>

    <hr class="my-2" />

    {@render children?.()}
  </div>
</dialog>

<style lang="postcss">
  @reference "../../app.css";

  dialog::backdrop {
    @apply bg-primary/70 backdrop-blur-xs;
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
