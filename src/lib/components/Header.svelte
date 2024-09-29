<script lang="ts">
  import HeaderMenu from '$lib/components/HeaderMenu.svelte';
  import InputCurrentCategory from '$lib/components/InputCurrentCategory.svelte';
  import InputHiddenColumns from '$lib/components/InputHiddenColumns.svelte';
  import Search from '$lib/components/Search.svelte';
</script>

<header class="relative bg-primary text-light w-full select-none">
  <div class="relative left-titlebar-area-x top-titlebar-area-y w-titlebar-area-width flex justify-center drag px-4 pt-4 text-3xl">
    <h1>EntityMe</h1>
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
