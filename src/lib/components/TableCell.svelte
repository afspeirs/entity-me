<script>
  import { tooltip } from '../actions/tooltip'
  import { copyToClipBoard } from '../utils/copyToClipboard';

  export let colspan = null;
  export let hidden = false;
  export let label = 'null';
</script>

<td
  {colspan}
  class="relative px-3 py-4 text-sm first-of-type:pl-6 last-of-type:pr-6 select-none"
  class:hidden={hidden}
>
  <slot>
    <span
      aria-hidden={!!label}
      class="text-gray-900 opacity-40 aria-hidden:opacity-100"
    >
      {label || 'N/A'}
    </span>
    {#if label}
      <button
        type="button"
        class="absolute inset-0 hover:bg-black/5"
        aria-label={label}
        on:click={() => copyToClipBoard(label)}
        use:tooltip={{
          content: `Copy "${label}" to the clipboard`,
          placement: 'bottom',
        }}
      />
    {/if}
  </slot>
</td>
