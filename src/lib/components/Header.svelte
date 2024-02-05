<script>
  import HeaderMenu from './HeaderMenu.svelte';
  import InputCurrentCategory from './InputCurrentCategory.svelte';
  import InputHiddenColumns from './InputHiddenColumns.svelte';
  import Search from './Search.svelte';
</script>

<header class="relative bg-primary text-light w-full select-none">
  <div class="relative left-titlebar-area-x top-titlebar-area-y w-titlebar-area-width flex justify-center drag px-4 pt-4 text-3xl">
    <h1>EntityMe</h1>
    -2
  </div>
  <HeaderMenu />
  <div class="flex flex-wrap max-sm:flex-col w-full p-4">
    <Search />
    <div class="flex">
      <InputCurrentCategory />
      <InputHiddenColumns />
    </div>
  </div>
</header>
