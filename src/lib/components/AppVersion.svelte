<script lang="ts">
  import { WrenchIcon } from '@lucide/svelte';
  import { style } from '#lib/components/Button.svelte';
</script>

<div class="{style.base} {style.withText} cursor-default">
  <WrenchIcon class="size-6 sm:size-5 shrink-0" aria-hidden="true" />
  <span>Version</span>
  <span class="ml-auto">{import.meta.env.APP_VERSION}</span>
</div>
