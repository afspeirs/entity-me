<script>
  import Icon from '@iconify/svelte';
  import { createListbox } from 'svelte-headlessui';
  import Transition from 'svelte-transition';
  import { categories } from '../entities';
  import { currentCategory } from '../stores/current-category';
  import { classNames } from '../utils/classNames';

  // console.log(categories);

  const listbox = createListbox({ label: 'current-category', selected: categories[0] })

  function onSelect(e) {
    const newValue = e.detail.selected.value;
    currentCategory.set(newValue);
  }
</script>

<div class="relative flex">
  <button
    use:listbox.button
    type="button"
    on:select={onSelect}
    class="relative -ml-px inline-flex items-center gap-x-1.5 px-3 py-2 text-sm font-semibold bg-white text-gray-900 ring-1 ring-inset ring-gray-300 focus-visible hover:bg-gray-50"
  >
    <Icon icon="heroicons:bars-arrow-up" class="-ml-0.5 h-5 w-5 text-gray-400" aria-hidden="true" />
    {$listbox.selected.label}
  </button>

  <Transition show={$listbox.expanded} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
    <ul
      use:listbox.items
      class="absolute z-20 top-full right-0 mt-1 w-80 max-h-96 overflow-auto rounded-md bg-white text-black py-1 text-sm shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
    >
      {#each categories as option, i}
        {@const active = $listbox.active === option}
        {@const selected = $listbox.selected === option}
        <li
          use:listbox.item={{ value: option }}
          class={classNames(
            'relative cursor-default select-none py-2 pl-10 pr-4',
            active ? 'bg-primary text-white' : 'text-gray-900',
          )}
        >
          <span class={classNames('block truncate', selected ? 'font-medium' : 'font-normal')}>
            {option.label}
          </span>
          {#if selected}
            <span class="absolute inset-y-0 left-0 flex items-center pl-3">
              <Icon icon="heroicons:check" class="h-5 w-5" aria-hidden="true" />
            </span>
          {/if}
        </li>
      {/each}
    </ul>
  </Transition>
</div>
