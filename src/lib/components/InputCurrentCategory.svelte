<script lang="ts">
  import { createSelect, melt } from '@melt-ui/svelte';
  import { CheckIcon, ChevronDownIcon, FilterIcon } from 'lucide-svelte';
  import { fade } from 'svelte/transition';

  import { currentCategory } from '$lib/context/current-category.svelte';
  import { categories } from '$lib/entities';
  import type { CategoryValue } from '$lib/entities/types';

  const {
    elements: { trigger, menu, option, label },
    states: { selectedLabel, open },
    helpers: { isSelected, isHighlighted },
  } = createSelect<CategoryValue>({
    defaultSelected: currentCategory.value
      ? categories.find((category) => category.value === currentCategory.value)
      : categories[0],
    forceVisible: true,
    positioning: {
      placement: 'bottom-start',
      fitViewport: true,
    },
    onSelectedChange: ({ next }) => {
      if (next) currentCategory.set(next.value);
      return next;
    },
  });
</script>

<div class="relative flex max-md:w-full bg-white dark:bg-dark max-md:rounded-bl-md">
  <!-- svelte-ignore a11y-label-has-associated-control -->
  <label class="sr-only" use:melt={$label}>Current Category</label>
  <button
    class="relative flex-1 whitespace-nowrap inline-flex items-center gap-x-1.5 px-3 py-2 text-sm font-semibold hover:bg-black/5 dark:hover:bg-white/5 text-gray-900 dark:text-white rounded-[inherit] ring-1 ring-inset ring-gray-300 dark:ring-gray-600 focus-visible"
    use:melt={$trigger}
  >
    <FilterIcon class="-ml-0.5 size-5 text-gray-400 shrink-0" aria-hidden="true" />
    <span>{`Filter: ${$selectedLabel}`}</span>
    <ChevronDownIcon class="ml-auto size-4 text-gray-400 shrink-0" aria-hidden="true" />
  </button>

  {#if $open}
    <div
      class="absolute z-20 top-full w-72 overflow-auto rounded-md bg-white dark:bg-dark text-black dark:text-white py-1 text-sm shadow-lg ring-1 ring-black/5 focus:outline-none"
      transition:fade={{ duration: 150 }}
      use:melt={$menu}
    >
      {#each categories as item}
        <div
          class="relative cursor-default select-none py-2 pl-10 pr-4 {$isHighlighted(item.value) ? 'bg-primary text-white' : 'text-gray-900 dark:text-white'}"
          use:melt={$option(item)}
        >
          <div class="absolute inset-y-0 left-0 flex items-center px-3 {$isSelected(item.value) ? 'block' : 'hidden'}">
            <CheckIcon class="size-5 {$isHighlighted(item.value) ? 'text-white' : 'text-black dark:text-white'}" />
          </div>

          <span class={$isSelected(item.value) ? 'font-medium' : 'font-normal'}>
            {item.label}
          </span>
        </div>
      {/each}
    </div>
  {/if}
</div>
