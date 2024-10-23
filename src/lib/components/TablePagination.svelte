<script lang="ts">
  import type { Entity } from '$lib/entities/types';

  type TablePaginationProps = {
    items: Entity[];
    perPage?: number;
    trimmedData: Entity[];
  };

  let {
    items,
    perPage = 100,
    trimmedData = $bindable(),
  }: TablePaginationProps = $props();

  let currentPage = $state(0);
  const totalItems = $derived(items.length);
  const totalPages = $derived(Math.ceil(totalItems / perPage));
  const start = $derived(currentPage * perPage);
  const end = $derived(currentPage === totalPages - 1 ? totalItems - 1 : start + perPage - 1);

  $effect(() => {
    trimmedData = items.slice(start, end + 1);
  });

  function handlePrevPage() {
    currentPage -= 1;
  }
  function handleNextPage() {
    currentPage += 1;
  }
</script>

{#if totalItems > 0}
  <nav
    class="flex items-center justify-between border-t border-gray-300 dark:border-gray-600 bg-white dark:bg-dark px-4 py-3 sm:px-6 select-none"
    aria-label="Pagination"
  >
    <div class="hidden sm:block">
      <p class="text-sm text-gray-700 dark:text-white">
        Showing <span class="font-medium">{start + 1}</span> to
        <span class="font-medium">{end + 1}</span>
        of <span class="font-medium">{totalItems}</span> results
      </p>
    </div>
    <div class="flex flex-1 justify-between sm:justify-end">
      <button
        type="button"
        onclick={handlePrevPage}
        disabled={currentPage === 0}
        class="relative ml-3 inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold enabled:hover:bg-black/5 enabled:dark:hover:bg-white/5 text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 dark:ring-gray-600 focus-visible:outline-offset-0 disabled:opacity-40"
      >
        Previous
      </button>
      <button
        type="button"
        onclick={handleNextPage}
        disabled={end + 1 === totalItems}
        class="relative ml-3 inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold enabled:hover:bg-black/5 enabled:dark:hover:bg-white/5 text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 dark:ring-gray-600 focus-visible:outline-offset-0 disabled:opacity-40"
      >
        Next
      </button>
    </div>
  </nav>
{/if}
