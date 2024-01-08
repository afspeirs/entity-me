<script>
  import InputCurrentCategory from './InputCurrentCategory.svelte';
  import InputHiddenColumns from './InputHiddenColumns.svelte';
  import Search from './Search.svelte';
</script>

<header class="bg-primary text-light w-full h-32 lg:h-20 drag select-none">
  <div class="absolute left-titlebar-area-x top-titlebar-area-y w-titlebar-area-width flex flex-col lg:flex-row h-[inherit] items-center gap-6 p-4">
    <h1 class="text-3xl">EntityMe</h1>

    <div class="flex flex-wrap no-drag w-full">
      <Search />
      <InputCurrentCategory />
      <InputHiddenColumns />
    </div>
  </div>
</header>
