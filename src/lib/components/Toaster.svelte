<script lang="ts" module>
  type ToastData = {
    title: string;
    description?: string;
    action?: {
      title: string;
      onclick: () => void;
    };
  };

  const toaster = new Toaster<ToastData>();

  export const addToast = toaster.addToast;
</script>

<script lang="ts">
  import { XIcon } from '@lucide/svelte';
  import { Toaster } from 'melt/builders';
  import { flip } from 'svelte/animate';
  import { fly } from 'svelte/transition';

  // Need to used $derived to ensure reactivity between the Toaster and the module
  const toasts = $derived(toaster.toasts);
</script>

<div {...toaster.root}>
  <div class="fixed right-0 bottom-0 flex flex-col items-end gap-2 m-4 z-50 select-none">
    {#each toasts as toast (toast.id)}
      <div
        animate:flip={{ duration: 500 }}
        in:fly={{ duration: 150, x: '100%' }}
        out:fly={{ duration: 150, x: '100%' }}
        class="rounded-lg bg-dark dark:bg-white text-white dark:text-dark shadow-md"
        {...toast.content}
      >
        <div class="relative min-w-36 max-w-[calc(100vw-2rem)] p-2">
          <div class="flex gap-2 font-semibold">
            <h3 class="flex items-center gap-2 px-2" {...toast.title}>
              {toast.data.title}
            </h3>
            {#if toast.data.action}
              <button
                class="p-2 rounded-md text-dark dark:text-white bg-white dark:bg-dark hover:bg-white/80 dark:hover:bg-dark/80 cursor-pointer"
                onclick={toast.data.action.onclick}
              >
                <span>{toast.data.action.title}</span>
              </button>
            {/if}
            <button
              class="p-2 rounded-md text-white dark:text-dark hover:bg-white/10 dark:hover:bg-black/10 cursor-pointer"
              {...toast.close}
            >
              <XIcon class="size-6" aria-hidden="true" />
              <span class="sr-only">Close notification</span>
            </button>
          </div>
          {#if toast.data.description}
            <div {...toast.description}>
              {toast.data.description}
            </div>
          {/if}
        </div>
      </div>
    {/each}
  </div>
</div>
