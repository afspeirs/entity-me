<script>
  import Icon from '@iconify/svelte';
  import { createListbox } from 'svelte-headlessui'
  import Transition from 'svelte-transition'

  import { headings } from '../entities';
  import { hiddenColumns } from '../stores/hidden-columns';

  const listbox = createListbox({ label: 'hidden-columns', selected: ['note'] })

  function onSelect(e) {
    const newValue = e.detail.selected;
    hiddenColumns.set(newValue);
  }
</script>

<div class="relative flex">
  <span class="inline-block w-full rounded-md shadow-sm">
    <button
      use:listbox.button
      on:select={onSelect}
      type="button"
      class="relative -ml-px inline-flex items-center gap-x-1.5 rounded-r-md px-3 py-2 text-sm font-semibold bg-white text-gray-900 ring-1 ring-inset ring-gray-300 focus-visible hover:bg-gray-50"
    >
      <div class="flex flex-wrap gap-2">
        Hidden Columns ({$listbox.selected.length}/{headings.length})
      </div>
    </button>
  </span>

  <Transition show={$listbox.expanded} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
    <ul
      use:listbox.items
      class="absolute top-full right-0 z-20 mt-1 w-80 max-h-96 overflow-auto rounded-md bg-white py-1 text-sm shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
    >
      {#each headings as value}
        {@const active = $listbox.active === value}
        {@const selected = $listbox.selected.includes(value)}
        <li
          class="relative cursor-default select-none py-2 pl-4 pr-9 focus:outline-none {active ? 'bg-primary text-white' : 'text-gray-900'}"
          use:listbox.item={{ value }}
        >
          <span class="block capitalize truncate {selected ? 'font-semibold' : 'font-normal'}">{value}</span>
          {#if selected}
            <span class="absolute inset-y-0 right-0 flex items-center pr-3">
              <Icon icon="heroicons:check" class="h-5 w-5" aria-hidden="true" />
            </span>
          {/if}
        </li>
      {/each}
    </ul>
  </Transition>
</div>
