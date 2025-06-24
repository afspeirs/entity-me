<script lang="ts">
  import type { Snippet } from 'svelte';

  type TableHeaderProps = {
    children: Snippet;
    hidden?: boolean;
  };

  const {
    children,
    hidden = false,
  }: TableHeaderProps = $props();
</script>

<th
  scope="col"
  class="sticky top-0 z-10 capitalize border-b border-gray-300 dark:border-gray-600 bg-white/75 dark:bg-dark/75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white backdrop-blur-sm backdrop-filter first-of-type:pl-6 last-of-type:pr-6 select-none"
  class:hidden
>
  {@render children?.()}
</th>
