<script lang="ts">
  import { MoonIcon, SunIcon } from '@lucide/svelte';

  import Button from '$lib/components/Button.svelte';
  import { theme, themeUserOptions } from '$lib/context/theme.svelte';

  function handleUpdateTheme() {
    theme.user = theme.system === 'dark' ? 'light' : 'dark';
  }
</script>

<Button
  icon={theme.system === 'dark' ? MoonIcon : SunIcon}
  text="Theme"
  onclick={handleUpdateTheme}
>
  <span class="ml-auto">{themeUserOptions[theme.system]}</span>
</Button>
