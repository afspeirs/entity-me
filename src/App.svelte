<script>
  import Header from './lib/components/Header.svelte';
  import Table from './lib/components/Table.svelte';
</script>

<svelte:head>
  <title>EntityMe</title>
</svelte:head>

<div class="absolute left-0 top-0 flex flex-col h-full w-full bg-light text-dark">
  <Header />

  <main class="flex-1 overflow-auto">
    <Table />
  </main>
</div>
