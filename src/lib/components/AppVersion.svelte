<script lang="ts">
  import { WrenchIcon } from '@lucide/svelte';
</script>

<div class="flex items-center w-full gap-2 text-gray-900 dark:text-white p-2 text-sm">
  <WrenchIcon class="size-5" aria-hidden="true" />
  <span>Version</span>
  <span class="ml-auto">{import.meta.env.APP_VERSION}</span>
</div>
