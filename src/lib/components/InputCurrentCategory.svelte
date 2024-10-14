<script lang="ts">
  import Icon from '@iconify/svelte';
  import type { FormEventHandler } from 'svelte/elements';
  import { createListbox } from 'svelte-headlessui';
  import Transition from 'svelte-transition';

  import { categories } from '$lib/entities';
  import { currentCategory } from '$lib/stores/current-category';
  import { classNames } from '$lib/utils/classNames';

  // console.log(categories);

  const listbox = createListbox({
    label: 'current-category',
    selected: $currentCategory
      ? categories.find((category) => category.value === $currentCategory)
      : categories[0]
  });

  const onSelect: FormEventHandler<HTMLButtonElement> = (event) => {
    // @ts-expect-error - It doesn't correctly have the detail.selected in the type
    const { value } = event.detail.selected as (typeof categories)[number];
    // console.log(value);

    currentCategory.set(value);
  };
</script>

<div class="relative flex max-sm:w-full bg-white dark:bg-dark max-sm:rounded-bl-md">
  <button
    use:listbox.button
    type="button"
    on:change={onSelect}
    class="relative flex-1 whitespace-nowrap inline-flex items-center gap-x-1.5 px-3 py-2 text-sm font-semibold hover:bg-black/5 dark:hover:bg-white/5 text-gray-900 dark:text-white rounded-[inherit] ring-1 ring-inset ring-gray-300 dark:ring-gray-600 focus-visible"
  >
    <Icon icon="lucide:filter" class="-ml-0.5 size-5 text-gray-400" aria-hidden="true" />
    {`Filter: ${$listbox.selected.label}`}
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
      class="absolute z-20 top-full max-sm:left-0 sm:right-0 mt-1 w-80 max-h-96 overflow-auto rounded-md bg-white dark:bg-dark text-black dark:text-white py-1 text-sm shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
    >
      {#each categories as value}
        {@const active = $listbox.active === value}
        {@const selected = $listbox.selected === value}
        <li
          use:listbox.item={{ value }}
          class={classNames(
            'relative cursor-default select-none py-2 pl-10 pr-4',
            active ? 'bg-primary text-white' : 'text-gray-900 dark:text-white',
          )}
        >
          <span class={classNames('block truncate', selected ? 'font-medium' : 'font-normal')}>
            {value.label}
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
