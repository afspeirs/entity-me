<script lang="ts">
  import { Select } from 'melt/builders';
  import { CheckIcon, ChevronDownIcon, EyeOffIcon } from 'lucide-svelte';
  import { fade } from 'svelte/transition';

  import { hiddenColumns } from '$lib/context/hidden-columns.svelte';
  import { headings } from '$lib/entities';
  import type { Heading } from '$lib/entities/types';

  const select = new Select<Heading, true>({
    floatingConfig: {
      computePosition: {
        placement: 'bottom-end',
      },
    },
    forceVisible: true,
    sameWidth: false,
    multiple: true,
    value: hiddenColumns.value,
    onValueChange: (value) => {
      if (!value) return;
      hiddenColumns.set([...value]);
    },
  });
</script>

<div class="relative flex max-md:w-full bg-white dark:bg-dark rounded-br-md md:rounded-r-md">
  <!-- eslint-disable-next-line svelte/valid-compile -->
  <label class="sr-only" {...select.label}>Current Category</label>
  <button
    class="relative flex-1 whitespace-nowrap inline-flex items-center gap-x-1.5 px-3 py-2 text-sm font-semibold cursor-pointer hover:bg-black/5 dark:hover:bg-white/5 text-gray-900 dark:text-white rounded-[inherit] focus-outline-inset"
    {...select.trigger}
  >
    <EyeOffIcon class="-ml-0.5 size-5 text-gray-400 shrink-0" aria-hidden="true" />
    Hidden Columns ({select.value.size || 0}/{headings.length})
    <ChevronDownIcon class="ml-auto size-4 text-gray-400 shrink-0" aria-hidden="true" />
  </button>

  {#if select.open}
    <div
      class="absolute z-20 w-72 max-h-[calc(var(--melt-popover-available-height)-10px)] overflow-auto rounded-md bg-white dark:bg-dark text-black dark:text-white py-1 text-sm shadow-lg ring-1 ring-black/5 focus:outline-hidden"
      transition:fade={{ duration: 150 }}
      {...select.content}
    >
      {#each headings as item (item)}
        <div
          class="relative cursor-default select-none py-2 pl-10 pr-4 text-gray-900 dark:text-white data-highlighted:bg-primary data-highlighted:text-white group/item"
          {...select.getOption(item)}
        >
          <div class="absolute inset-y-0 left-0 flex items-center px-3 {select.isSelected(item) ? 'block' : 'hidden'}">
            <CheckIcon class="size-5 group-data-highlighted/item:text-white" />
          </div>

          <span class="capitalize {select.isSelected(item) ? 'font-medium' : 'font-normal'}">
            {item}
          </span>
        </div>
      {/each}
    </div>
  {/if}
</div>
