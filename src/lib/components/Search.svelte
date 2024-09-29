<script lang="ts">
  import Icon from "@iconify/svelte";
  import { search } from "$lib/stores/search";

  let input: HTMLInputElement;
</script>

<svelte:window
  on:keydown={(e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
      e.preventDefault();
      input.focus()
    }
  }}
/>

<div class="relative flex flex-grow items-stretch">
  <label for="search" class="sr-only">
    Search candidates
  </label>
  <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
    <Icon icon="lucide:search" class="size-5 text-gray-400" aria-hidden="true" />
  </div>
  <input
    type="search"
    name="search"
    id="search"
    bind:this={input}
    bind:value={$search}
    class="block w-full bg-white py-1.5 pl-10 text-gray-900 placeholder:text-gray-400 border-0 rounded-none rounded-tl-md max-sm:rounded-tr-md sm:rounded-l-md ring-1 ring-inset ring-gray-300 focus-visible"
    placeholder="Search entities"
  />
  <div class="absolute inset-y-0 right-0">
    {#if $search.length > 0}
      <button
        type="button"
        on:click={() => search.set('')}
        class="p-2 rounded focus-visible ring-inset"
      >
        <span class="sr-only">clear</span>
        <Icon icon="lucide:x" class="size-5 text-black" aria-hidden="true" />
      </button>
    {/if}
  </div>
</div>
