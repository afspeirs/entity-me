<script lang="ts">
  import Icon from '@iconify/svelte';
  import type { FormEventHandler } from 'svelte/elements';
  import { createListbox } from 'svelte-headlessui';
  import Transition from 'svelte-transition';

  import { headings } from '$lib/entities';
  import { hiddenColumns } from '$lib/stores/hidden-columns';
  import { classNames } from '$lib/utils/classNames';

  const listbox = createListbox({ label: 'hidden-columns', selected: $hiddenColumns });

  const onSelect: FormEventHandler<HTMLButtonElement> = (event) => {
    // @ts-expect-error - It doesn't correctly have the detail.selected in the type
    const { selected } = event.detail;
    // console.log(selected);

    hiddenColumns.set(selected);
  };
</script>

<div class="relative flex max-sm:w-full bg-white dark:bg-dark rounded-br-md sm:rounded-r-md">
  <button
    use:listbox.button
    type="button"
    on:change={onSelect}
    class="relative flex-1 whitespace-nowrap inline-flex items-center gap-x-1.5 px-3 py-2 text-sm font-semibold hover:bg-black/5 dark:hover:bg-white/5 text-gray-900 dark:text-white rounded-[inherit] ring-1 ring-inset ring-gray-300 dark:ring-gray-600 focus-visible"
  >
    <Icon icon="lucide:eye-off" class="-ml-0.5 size-5 text-gray-400" aria-hidden="true" />
    Hidden Columns ({$listbox.selected.length}/{headings.length})
    <Icon icon="lucide:chevron-down" class="ml-1 size-4 text-gray-400" aria-hidden="true" />
  </button>

  <Transition
    show={$listbox.expanded}
    leave="transition ease-in duration-100"
    leaveFrom="opacity-100"
    leaveTo="opacity-0"
  >
    <ul
      use:listbox.items
      class="absolute z-20 top-full right-0 mt-1 w-80 max-h-96 overflow-auto rounded-md bg-white dark:bg-dark text-black dark:text-white py-1 text-sm shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
    >
      {#each headings as value}
        {@const active = $listbox.active === value}
        {@const selected = $listbox.selected.includes(value)}
        <li
          use:listbox.item={{ value }}
          class={classNames(
            'relative cursor-default select-none py-2 pl-10 pr-4',
            active ? 'bg-primary text-white' : 'text-gray-900 dark:text-white',
          )}
        >
          <span class={classNames('block capitalize truncate', selected ? 'font-medium' : 'font-normal')}>
            {value}
          </span>
          {#if selected}
            <span class="absolute inset-y-0 left-0 flex items-center pl-3">
              <Icon icon="lucide:check" class="size-5" aria-hidden="true" />
            </span>
          {/if}
        </li>
      {/each}
    </ul>
  </Transition>
</div>
