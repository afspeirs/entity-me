<script lang="ts">
  import { MoonIcon, SunIcon } from '@lucide/svelte';

  import Button from '#lib/components/Button.svelte';
  import { theme, themeUserOptions } from '#lib/context/theme.svelte.js';

  function handleUpdateTheme() {
    theme.user = theme.system === 'dark' ? 'light' : 'dark';
  }
</script>

{#snippet secondaryAction()}
  {themeUserOptions[theme.system]}
{/snippet}

<Button
  colour="primaryHover"
  icon={theme.system === 'dark' ? MoonIcon : SunIcon}
  onclick={handleUpdateTheme}
  {secondaryAction}
>
  Theme
</Button>
