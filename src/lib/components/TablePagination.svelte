<script lang="ts">
  type TablePaginationProps = {
    totalItems: number;
    perPage?: number;
    currentPage: number;
  };

  let {
    totalItems,
    perPage = 100,
    currentPage = $bindable(),
  }: TablePaginationProps = $props();

  const totalPages = $derived(Math.ceil(totalItems / perPage));
  const start = $derived(currentPage * perPage);
  const end = $derived(currentPage === totalPages - 1 ? totalItems - 1 : start + perPage - 1);

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
    <p class="text-sm text-pretty text-gray-900 dark:text-white">
      Showing <span class="font-medium">{start + 1}</span> to
      <span class="font-medium">{end + 1}</span>
      of <span class="font-medium">{totalItems}</span> results
    </p>
    <div class="flex flex-1 justify-end">
      <button
        type="button"
        onclick={handlePrevPage}
        disabled={currentPage === 0}
        class="relative ml-3 inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold enabled:hover:bg-black/5 dark:enabled:hover:bg-white/5 text-gray-900 dark:text-white not-disabled:cursor-pointer disabled:opacity-40 ring-1 ring-inset ring-gray-300 dark:ring-gray-600 focus-outline"
      >
        Previous
      </button>
      <button
        type="button"
        onclick={handleNextPage}
        disabled={end + 1 === totalItems}
        class="relative ml-3 inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold enabled:hover:bg-black/5 dark:enabled:hover:bg-white/5 text-gray-900 dark:text-white not-disabled:cursor-pointer disabled:opacity-40 ring-1 ring-inset ring-gray-300 dark:ring-gray-600 focus-outline"
      >
        Next
      </button>
    </div>
  </nav>
{/if}
