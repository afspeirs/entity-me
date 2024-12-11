<script lang="ts">
  import Icon from '@iconify/svelte';
  import { search } from '$lib/context/search.svelte';

  let input: HTMLInputElement;
</script>

<svelte:window
  on:keydown={(e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
      e.preventDefault();
      input.focus();
    }
  }}
/>

<div class="relative flex flex-grow items-stretch">
  <label for="search" class="sr-only">Search candidates</label>
  <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
    <Icon icon="lucide:search" class="size-5 text-gray-400" aria-hidden="true" />
  </div>
  <input
    type="search"
    name="search"
    id="search"
    bind:this={input}
    bind:value={search.value}
    class="block w-full bg-white dark:bg-dark py-1.5 pl-10 text-gray-900 dark:text-white placeholder:text-gray-400 border-0 rounded-none rounded-tl-md max-md:rounded-tr-md md:rounded-l-md ring-1 ring-inset ring-gray-300 dark:ring-gray-600 focus-visible"
    placeholder="Search entities"
  />
  {#if search.value.length > 0}
    <div class="absolute inset-y-0 right-0">
      <button
        type="button"
        class="p-2 hover:bg-black/5 dark:hover:bg-white/5 focus-visible ring-inset"
        on:click={() => search.set('')}
      >
        <span class="sr-only">clear</span>
        <Icon icon="lucide:x" class="size-5 text-black dark:text-white" aria-hidden="true" />
      </button>
    </div>
  {/if}
</div>
