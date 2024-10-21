<script lang="ts">
  import Icon from '@iconify/svelte';
  import type { Snippet } from 'svelte';

  import { classNames } from '$lib/utils/classNames';

  type ButtonProps = {
    children: Snippet,
    class?: string,
    icon?: string,
    iconOnly?: boolean,
    invert?: boolean,
    onclick: () => void,
    text: string,
  };

  const {
    children,
    class: className = '',
    icon = '',
    iconOnly = false,
    invert = false,
    onclick,
    text,
  }: ButtonProps = $props();
</script>

<button
  class={classNames(
    'p-2 text-sm rounded-md focus-visible ring-inset',
    invert ? 'hover:bg-black/20' : 'hover:bg-black/5 dark:hover:bg-white/5',
    !iconOnly ? 'flex items-center w-full gap-2 text-gray-900 dark:text-white' : '',
    className,
  )}
  onclick={onclick}
>
  {#if icon !== ''}<Icon icon={`lucide:${icon}`} class="size-5" aria-hidden="true" />{/if}
  <span class={iconOnly ? 'sr-only' : ''}>{text}</span>

  {#if children}
    {@render children()}
  {/if}
</button>
