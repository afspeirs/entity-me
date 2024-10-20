<script lang="ts">
  import Header from '$lib/components/Header.svelte';
  import Toaster from '$lib/components/Toaster.svelte';
  import { themeSystem } from '$lib/stores/theme';
  import '$lib/utils/registerServiceWorker';
  import '../webmanifest-apple';
  import '../app.css';

  themeSystem.subscribe((theme) => {
    if (theme === 'dark') {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  });
</script>

<svelte:head>
  <title>EntityMe</title>
</svelte:head>

<div class="absolute left-0 top-0 flex flex-col h-full w-full bg-light text-dark dark:bg-black/95 dark:text-white">
  <Header />

  <main class="flex-1 overflow-auto">
    <slot />
  </main>
</div>

<Toaster />
