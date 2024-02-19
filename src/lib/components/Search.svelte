<script>
  import Icon from "@iconify/svelte";
  import { search } from "../stores/search";

  let input;
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
    <Icon icon="heroicons:magnifying-glass-solid" class="size-5 text-gray-400" aria-hidden="true" />
  </div>
  <input
    type="search"
    name="search"
    id="search"
    bind:this={input}
    bind:value={$search}
    class="block w-full rounded-none rounded-tl-md max-sm:rounded-tr-md sm:rounded-l-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus-visible"
    placeholder="Search entities"
  />
  <div class="absolute inset-y-0 right-0">
    {#if $search.length > 0}
      <button
        type="button"
        on:click={() => search.set('')}
        class="rounded focus-visible"
      >
        <span class="sr-only">clear</span>
        <Icon icon="heroicons:x-mark" class="size-6 text-black" aria-hidden="true" />
      </button>
    {/if}
  </div>
</div>
