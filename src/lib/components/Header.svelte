<script>
  import Settings from './Settings.svelte';
</script>

<header class="bg-primary text-light w-full h-16 drag select-none">
  <div class="absolute left-titlebar-area-x top-titlebar-area-y w-titlebar-area-width flex items-center h-16 px-4">
    <h1 class="text-3xl">EntityMe</h1>

    <div class="no-drag ml-auto">
      <Settings />
    </div>
  </div>
</header>
