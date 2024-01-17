<script>
  export let items;
  export let perPage = 100;
  export let trimmedData;

  $: totalItems = items.length;
  $: currentPage = 0;
  $: totalPages = Math.ceil(totalItems / perPage);
  $: start = currentPage * perPage;
  $: end = currentPage === totalPages - 1 ? totalItems - 1 : start + perPage - 1;

  $: trimmedData = items.slice(start, end + 1);

  function handlePrevPage() {
    currentPage -= 1;
  }
  function handleNextPage() {
    currentPage += 1;
  }
</script>

<nav
  class="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6 select-none"
  aria-label="Pagination"
>
  <div class="hidden sm:block">
    <p class="text-sm text-gray-700">
      Showing <span class="font-medium">{start + 1}</span> to <span class="font-medium">{end + 1}</span> of <span class="font-medium">{totalItems}</span> results
    </p>
  </div>
  <div class="flex flex-1 justify-between sm:justify-end">
    <button
      type="button"
      on:click={handlePrevPage}
      disabled={currentPage === 0}
      class="relative inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0 disabled:opacity-40"
    >
      Previous
    </button>
    <button
      type="button"
      on:click={handleNextPage}
      disabled={end + 1 === totalItems}
      class="relative ml-3 inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0 disabled:opacity-40"
    >
      Next
    </button>
  </div>
</nav>
