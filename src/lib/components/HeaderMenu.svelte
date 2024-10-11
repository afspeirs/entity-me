<script lang="ts">
  import Icon from '@iconify/svelte';
  import { createMenu } from 'svelte-headlessui';
  import Transition from 'svelte-transition';

  import { updateAvailable } from '$lib/stores/service-worker';
  import { themeSystem, themeUser } from '$lib/stores/theme';
  import { classNames } from '$lib/utils/classNames';

  type MenuItem = {
    icon: string;
    text: string;
    onClick?: () => void;
  };

  const menu = createMenu({ label: 'Actions' });
  const groups: MenuItem[][] = [
    [
      {
        icon: 'wrench',
        text: `Version: ${import.meta.env.APP_VERSION}`,
      },
    ],
    [
      {
        icon: 'rocket',
        text: $updateAvailable ? 'Update' : 'Check for update',
        onClick: () => {
          menu.close();
          if ($updateAvailable) {
            $updateAvailable();
          } else {
            if ('serviceWorker' in navigator) {
              navigator.serviceWorker.ready.then((registration) => registration.update());
            } else {
              setTimeout(() => window.location.reload(), 1500);
            }
          }
        },
      },
      {
        icon: $themeSystem === 'dark' ? 'moon' : 'sun',
        text: $themeSystem === 'dark' ? 'Theme: Dark' : 'Theme: Light',
        onClick: () => {
          menu.close();
          themeUser.set($themeSystem === 'dark' ? 'light' : 'dark')
        },
      }
    ],
  ];

  // Very hacky thing to get svelte to update the #each for me
  updateAvailable.subscribe((value) => {
    groups[1][0].text = value ? 'Update' : 'Check for update';
  });
  // Very hacky thing to get svelte to update the #each for me
  themeSystem.subscribe((value) => {
    groups[1][1].icon = value === 'dark' ? 'moon' : 'sun';
    groups[1][1].text = value === 'dark' ? 'Theme: Dark' : 'Theme: Light';
  });
</script>

<div class="absolute left-titlebar-area-x top-titlebar-area-y z-50 no-drag">
  <button
    use:menu.button
    class="inline-flex justify-center rounded-md p-2 text-sm font-medium text-white hover:bg-black/20 focus-visible ring-inset"
  >
    <Icon icon="lucide:more-vertical" class="size-6" aria-hidden="true" />
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
    <div class="fixed inset-0" aria-hidden="true"></div>
    <div
      use:menu.items
      class="absolute left-2 w-56 origin-top-left mt-1 divide-y divide-gray-100 dark:divide-gray-700 rounded-md bg-white dark:bg-dark shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
    >
      {#key groups}
        {#each groups as group}
          <div class="p-1">
            {#each group as option}
              {@const isActive = $menu.active === option.text}
              {@const isButton = option?.onClick}
              <!-- svelte-ignore a11y-no-static-element-interactions -->
              <svelte:element
                this={isButton ? 'button' : 'div'}
                use:menu.item
                on:click={option?.onClick}
                class={classNames(
                  'flex rounded-md items-center w-full p-2 gap-2 text-sm',
                  isButton && isActive ? 'bg-primary text-white' : 'text-gray-900 dark:text-white',
                )}
              >
                <Icon icon={`lucide:${option.icon}`} class="size-5" aria-hidden="true" />
                {option.text}
              </svelte:element>
            {/each}
          </div>
        {/each}
      {/key}
    </div>
  </Transition>
</div>
