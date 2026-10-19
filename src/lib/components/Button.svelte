<script lang="ts" module>
  type BaseButtonProps = {
    active?: boolean;
    children: Snippet;
    class?: string;
    colour?: keyof typeof colours;
    icon?: Component;
    iconClassName?: string;
    iconOnly?: boolean;
    secondaryAction?: Snippet;
    fullWidth?: boolean;
  };

  type ButtonOptions = BaseButtonProps & HTMLButtonAttributes & {
    disabled?: boolean;
    href?: never;
    onclick?: (event: MouseEvent) => void;
  };

  type LinkOptions = BaseButtonProps & HTMLAnchorAttributes & {
    disabled?: never;
    href: string;
    onclick?: never;
  };

  export type ButtonProps = ButtonOptions | LinkOptions;

  export const style = {
    base: 'peer/button rounded-lg select-none disabled:opacity-40 disabled:pointer-events-none focus-visible ring-inset',
    iconOnly: 'p-3 sm:p-2',
    fullWidth: 'min-w-0 w-full',
    withText: 'flex items-center gap-3 p-3 sm:py-2',
  } as const;

  export const colours = {
    base: 'text-dark dark:text-light hover:bg-gray-300 dark:hover:bg-neutral-700',
    inverted: 'text-light dark:text-dark hover:bg-neutral-700 dark:hover:bg-gray-300',
    primary: 'text-light bg-primary hover:bg-primary/90',
    primaryHover: 'text-dark dark:text-light hover:bg-primary',
  } as const;

  export const coloursActive = {
    ...colours,
    base: 'bg-gray-200 hover:bg-gray-300 dark:bg-neutral-700/60 dark:hover:bg-neutral-700',
  } as const;
</script>

<script lang="ts">
  import type { Component, Snippet } from 'svelte';
  import type { HTMLAnchorAttributes, HTMLButtonAttributes } from 'svelte/elements';

  import { resolve } from '$app/paths';
  import type { Path } from '$app/types';
  import { classNames } from '#lib/utils/classNames.js';

  let {
    active,
    children,
    class: className = '',
    colour = 'base',
    disabled,
    fullWidth = true,
    href,
    icon: Icon,
    iconClassName = '',
    iconOnly,
    onclick,
    secondaryAction,
    ...restProps
  }: ButtonProps = $props();

  const externalHref = $derived(typeof href === 'string' && href.startsWith('https://'));
</script>

{#if href}
  <a
    class={classNames(
      'block',
      'cursor-pointer',
      iconOnly ? style.iconOnly : style.withText,
      !iconOnly && fullWidth ? style.fullWidth : '',
      active ? coloursActive[colour] : colours[colour],
      style.base,
      className,
    )}
    href={resolve(href as Path)}
    target={externalHref ? '_blank' : undefined}
    rel={externalHref ? 'external noopener noreferrer' : undefined}
    {onclick}
    {...restProps as HTMLAnchorAttributes}
  >
    {#if Icon}
      <Icon class="size-6 sm:size-5 shrink-0 {iconClassName}" />
    {/if}

    <span class={classNames(iconOnly ? '' : 'truncate', iconOnly && Icon ? 'sr-only' : '')}>
      {@render children?.()}
    </span>

    {#if secondaryAction}
      <div class="ml-auto flex gap-2">
        {@render secondaryAction()}
      </div>
    {/if}
  </a>
{:else}
  <button
    type="button"
    class={classNames(
      'cursor-pointer',
      iconOnly ? style.iconOnly : style.withText,
      !iconOnly && fullWidth ? style.fullWidth : '',
      active ? coloursActive[colour] : colours[colour],
      style.base,
      className,
    )}
    {disabled}
    {onclick}
    {...restProps as HTMLButtonAttributes}
  >
    {#if Icon}
      <Icon class="size-6 sm:size-5 shrink-0 {iconClassName}" />
    {/if}

    <span class={classNames(iconOnly ? '' : 'truncate', iconOnly && Icon ? 'sr-only' : '')}>
      {@render children?.()}
    </span>

    {#if secondaryAction}
      <div class="ml-auto flex gap-2">
        {@render secondaryAction()}
      </div>
    {/if}
  </button>
{/if}
