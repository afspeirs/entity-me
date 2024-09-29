<script lang="ts">
  export let hidden = false;
</script>

<th
  scope="col"
  class="sticky top-0 z-10 capitalize border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter first-of-type:pl-6 last-of-type:pr-6 select-none"
  class:hidden={hidden}
>
  <slot />
</th>
