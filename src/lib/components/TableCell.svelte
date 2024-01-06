<script>
  export let colspan = null;
  export let hidden = false;
</script>

<td
  {colspan}
  class="px-3 py-4 text-sm text-gray-900 first-of-type:pl-6 last-of-type:pr-6s"
  class:hidden={hidden}
>
  <slot />
</td>
