<script>
  import Icon from '@iconify/svelte';
  import { createMenu } from 'svelte-headlessui';
  import Transition from 'svelte-transition';
  import { updateServiceWorker } from '../utils/updateServiceWorker';

  import { updateAvailable } from '../stores/service-worker';

  const menu = createMenu({ label: 'Actions' });

  const groups = [
    [
      {
        icon: 'wrench',
        text: `Version: ${import.meta.env.APP_VERSION}`,
      },
    ],
    [
      {
        icon: 'device-phone-mobile',
        text: $updateAvailable ? 'Update' : 'Check for update',
        onClick: () => updateServiceWorker($updateAvailable),
      },
    ],
  ];
</script>

<div class="absolute left-titlebar-area-x top-titlebar-area-y z-50 no-drag">
  <button
    use:menu.button
    class="inline-flex w-full justify-center rounded-md p-2 text-sm font-medium text-white hover:bg-black/20 focus-visible ring-inset"
  >
    <Icon icon="heroicons:ellipsis-vertical" class="size-6" aria-hidden="true" />
    <span class="sr-only">Open Menu</span>
  </button>

  <Transition
    show={$menu.expanded}
    enter="transition ease-out duration-100"
    enterFrom="transform opacity-0 scale-95"
    enterTo="transform opacity-100 scale-100"
    leave="transition ease-in duration-75"
    leaveFrom="transform opacity-100 scale-100"
    leaveTo="transform opacity-0 scale-95"
  >
    <div class="fixed inset-0" aria-hidden="true" />
    <div
      use:menu.items
      class="absolute left-2 w-56 origin-top-left mt-1 divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
    >
      {#each groups as group}
        <div class="px-1 py-1">
          {#each group as option}
            {@const isActive = $menu.active === option.text}
            {@const isButton = option.onClick}
            <!-- svelte-ignore a11y-no-static-element-interactions -->
            <svelte:element
              this={isButton ? 'button' : 'div'}
              use:menu.item
              on:click={option.onClick}
              class="group flex rounded-md items-center w-full px-2 py-2 gap-2 text-sm {isButton && isActive ? 'bg-primary text-white' : 'text-gray-900'}"
            >
              <Icon icon={`heroicons:${option.icon}`} class="w-5 h-5" aria-hidden="true" />
              {option.text}
            </svelte:element>
          {/each}
        </div>
      {/each}
    </div>
  </Transition>
</div>
