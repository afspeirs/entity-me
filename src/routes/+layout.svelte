<script lang="ts">
  import { registerServiceWorker } from '@afspeirs/service-worker';
  import { SvelteToast } from '@zerodevx/svelte-toast';

  import Header from '$lib/components/Header.svelte';
  import ServiceWorkerEvents from '$lib/components/ServiceWorkerEvents.svelte';
  import '../webmanifest-apple';
  import '../app.css';

  registerServiceWorker({
    register: import.meta.env.PROD,
  });
</script>

<svelte:head>
  <title>EntityMe</title>
</svelte:head>

<div class="absolute left-0 top-0 flex flex-col h-full w-full bg-light text-dark">
  <Header />

  <main class="flex-1 overflow-auto">
    <slot />
  </main>
</div>

<ServiceWorkerEvents />

<SvelteToast
  options={{
    reversed: true,
    intro: { y: 192 },
  }}
/>

<style>
  :root {
    --toastContainerTop: auto;
    --toastContainerRight: 1rem;
    --toastContainerBottom: 1rem;
    --toastContainerLeft: auto;
  }
</style>
