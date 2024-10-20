<script lang="ts">
  import Icon from '@iconify/svelte';
  import { createSelect, melt } from '@melt-ui/svelte';
  import { fade } from 'svelte/transition';

  import { headings } from '$lib/entities';
  import { hiddenColumns } from '$lib/stores/hidden-columns';
  import type { Heading } from '$lib/entities/types';

  const {
    elements: { trigger, menu, option, label },
    states: { open, selected },
    helpers: { isSelected, isHighlighted },
  } = createSelect<Heading, true>({
    // TODO: stop the need for all this mapping, and update hiddenColumns to be a label/value pair
    defaultSelected: $hiddenColumns.map((item) => ({ label: item, value: item })),
    forceVisible: true,
    positioning: {
      placement: 'bottom-end',
      fitViewport: true,
    },
    multiple: true,
    onSelectedChange: ({ next }) => {
      if (next) {
        const newValues = next.map((item) => item.value);
        hiddenColumns.set(newValues);
      }
      return next;
    },
  });
</script>

<div class="relative flex max-md:w-full bg-white dark:bg-dark rounded-br-md md:rounded-r-md">
  <!-- svelte-ignore a11y-label-has-associated-control -->
  <label class="sr-only" use:melt={$label}>Current Category</label>
  <button
    class="relative flex-1 whitespace-nowrap inline-flex items-center gap-x-1.5 px-3 py-2 text-sm font-semibold hover:bg-black/5 dark:hover:bg-white/5 text-gray-900 dark:text-white rounded-[inherit] ring-1 ring-inset ring-gray-300 dark:ring-gray-600 focus-visible"
    use:melt={$trigger}
  >
    <Icon icon="lucide:eye-off" class="-ml-0.5 size-5 text-gray-400 shrink-0" aria-hidden="true" />
    Hidden Columns ({$selected?.length || 0}/{headings.length})
    <Icon
      icon="lucide:chevron-down"
      class="ml-auto size-4 text-gray-400 shrink-0"
      aria-hidden="true"
    />
  </button>

  {#if $open}
    <div
      class="absolute z-20 top-full w-72 overflow-auto rounded-md bg-white dark:bg-dark text-black dark:text-white py-1 text-sm shadow-lg ring-1 ring-black/5 focus:outline-none"
      transition:fade={{ duration: 150 }}
      use:melt={$menu}
    >
      {#each headings as item}
        <div
          class="relative cursor-default select-none py-2 pl-10 pr-4 {$isHighlighted(item)
            ? 'bg-primary text-white'
            : 'text-gray-900 dark:text-white'}"
          use:melt={$option({ label: item, value: item })}
        >
          <div
            class="absolute inset-y-0 left-0 flex items-center px-3 {$isSelected(item)
              ? 'block'
              : 'hidden'}"
          >
            <Icon
              icon="lucide:check"
              class="size-5 {$isHighlighted(item) ? 'text-white' : 'text-black dark:text-white'}"
            />
          </div>

          <span class="capitalize {$isSelected(item) ? 'font-medium' : 'font-normal'}">
            {item}
          </span>
        </div>
      {/each}
    </div>
  {/if}
</div>
