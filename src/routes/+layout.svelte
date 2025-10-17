<script lang="ts">
  import Header from '$lib/components/Header.svelte';
  import Toaster from '$lib/components/Toaster.svelte';
  import { theme } from '$lib/context/theme.svelte';
  import '$lib/utils/registerServiceWorker';
  import '../webmanifest-apple';
  import '../app.css';

  let { children } = $props();

  $effect(() => {
    document.documentElement.setAttribute('data-theme', theme.system);
  });
</script>

<svelte:head>
  <meta name="version" content={import.meta.env.APP_VERSION}>
</svelte:head>

<div class="absolute left-0 top-0 flex flex-col h-full w-full bg-light text-dark dark:bg-black/95 dark:text-white">
  <Header />

  <main class="flex-1 overflow-auto">
    {@render children()}
  </main>
</div>

<Toaster />
