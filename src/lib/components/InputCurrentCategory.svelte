<script lang="ts">
  import { Select } from 'melt/builders';
  import { CheckIcon, ChevronDownIcon, FunnelIcon } from 'lucide-svelte';
  import { fade } from 'svelte/transition';

  import { currentCategory } from '$lib/context/current-category.svelte';
  import { categories } from '$lib/entities';
  import type { CategoryValue } from '$lib/entities/types';

  const select = new Select<CategoryValue>({
    floatingConfig: {
      computePosition: {
        placement: 'bottom-start',
      },
    },
    forceVisible: true,
    sameWidth: false,
    value: currentCategory.value,
    onValueChange: (value) => {
      if (!value) return;
      currentCategory.set(value);
    },
  });

  const selectedCategory = $derived(categories.find((category) => category.value === currentCategory.value));
</script>

<div class="relative flex max-md:w-full bg-white dark:bg-dark max-md:rounded-bl-md">
  <!-- eslint-disable-next-line svelte/valid-compile -->
  <label class="sr-only" {...select.label}>Current Category</label>
  <button
    class="relative flex-1 whitespace-nowrap inline-flex items-center gap-x-1.5 px-3 py-2 text-sm font-semibold cursor-pointer hover:bg-black/5 dark:hover:bg-white/5 text-gray-900 dark:text-white rounded-[inherit] ring-1 ring-inset ring-gray-300 dark:ring-gray-600 focus-visible"
    {...select.trigger}
  >
    <FunnelIcon class="-ml-0.5 size-5 text-gray-400 shrink-0" aria-hidden="true" />
    <span>{`Filter: ${selectedCategory?.label}`}</span>
    <ChevronDownIcon class="ml-auto size-4 text-gray-400 shrink-0" aria-hidden="true" />
  </button>

  {#if select.open}
    <div
      class="absolute z-20 w-72 max-h-[calc(var(--melt-popover-available-height)-10px)] overflow-auto rounded-md bg-white dark:bg-dark text-black dark:text-white py-1 text-sm shadow-lg ring-1 ring-black/5 focus:outline-hidden"
      transition:fade={{ duration: 150 }}
      {...select.content}
    >
      {#each categories as item}
        <div
          class="relative cursor-default select-none py-2 pl-10 pr-4 text-gray-900 dark:text-white data-highlighted:bg-primary data-highlighted:text-white group/item"
          {...select.getOption(item.value)}
        >
          <div class="absolute inset-y-0 left-0 flex items-center px-3 {select.isSelected(item.value) ? 'block' : 'hidden'}">
            <CheckIcon class="size-5 group-data-highlighted/item:text-white" />
          </div>

          <span class="{select.isSelected(item.value) ? 'font-medium' : 'font-normal'}">
            {item.label}
          </span>
        </div>
      {/each}
    </div>
  {/if}
</div>
