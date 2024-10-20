<script lang="ts">
  import Icon from '@iconify/svelte';

  import { classNames } from '$lib/utils/classNames';

  let className = '';
  export { className as class };
  export let icon = '';
  export let iconOnly = false;
  export let invert = false;
  export let text;
</script>

<button
  class={classNames(
    'p-2 text-sm rounded-md focus-visible ring-inset',
    invert ? 'hover:bg-black/20' : 'hover:bg-black/5 dark:hover:bg-white/5',
    !iconOnly ? 'flex items-center w-full gap-2 text-gray-900 dark:text-white' : '',
    className,
  )}
  on:click
>
  {#if icon}<Icon icon={`lucide:${icon}`} class="size-5" aria-hidden="true" />{/if}
  <span class={iconOnly ? 'sr-only' : ''}>{text}</span>
  <slot />
</button>
