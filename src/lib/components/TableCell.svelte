<script lang="ts">
  import { tooltip } from '$lib/actions/tooltip';
  import { copyToClipBoard } from '$lib/utils/copyToClipboard';
  import type { Snippet } from 'svelte';

  type TableCellProps = {
    children?: Snippet;
    column?: string;
    colspan?: number;
    hidden?: boolean;
    label?: string;
  };

  const {
    children,
    column = '',
    colspan,
    hidden = false,
    label = '',
  }: TableCellProps = $props();

  const showButton = $derived(!!label && column !== 'description');
</script>

<td
  {colspan}
  class="relative px-3 py-4 text-sm first-of-type:pl-6 last-of-type:pr-6"
  class:hidden
  class:select-none={showButton || !label}
>
  {#if children}
    {@render children()}
  {:else}
    <span
      aria-hidden={!!label || showButton}
      class="text-gray-900 dark:text-white opacity-40 aria-hidden:opacity-100"
      class:underline={showButton}
      class:decoration-dotted={showButton}
      class:underline-offset-4={showButton}
    >
      {label || 'N/A'}
    </span>
    {#if showButton}
      <button
        type="button"
        class="absolute inset-0 hover:bg-black/5 dark:hover:bg-white/5"
        onclick={() => copyToClipBoard(label)}
        use:tooltip={{
          content: `Copy "${label}" to the clipboard`,
        }}
      >
        <span class="sr-only">{label}</span>
      </button>
    {/if}
  {/if}
</td>
