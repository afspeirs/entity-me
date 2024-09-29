<script lang="ts">
  import { tooltip } from '$lib/actions/tooltip';
  import { copyToClipBoard } from '$lib/utils/copyToClipboard';

  export let column = '';
  export let colspan: number | null = null;
  export let hidden = false;
  export let label = '';

  $: showButton = !!label && column !== 'description';
</script>

<td
  {colspan}
  class="relative px-3 py-4 text-sm first-of-type:pl-6 last-of-type:pr-6"
  class:hidden
  class:select-none={showButton || !label}
>
  <slot>
    <span
      aria-hidden={!!label || showButton}
      class="text-gray-900 opacity-40 aria-hidden:opacity-100"
      class:underline={showButton}
      class:decoration-dotted={showButton}
      class:underline-offset-4={showButton}
    >
      {label || 'N/A'}
    </span>
    {#if showButton}
      <button
        type="button"
        class="absolute inset-0 hover:bg-black/5 select-none"
        on:click={() => copyToClipBoard(label)}
        use:tooltip={{
          content: `Copy "${label}" to the clipboard`,
        }}
      >
        <span class="sr-only">{label}</span>
      </button>
    {/if}
  </slot>
</td>
