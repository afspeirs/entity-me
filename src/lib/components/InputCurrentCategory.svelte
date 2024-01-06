<script>
  import { categories } from '../entities';
  import { currentCategory } from '../stores/current-category';

  // console.log(categories);
</script>

<label for="current-category" class="block my-2 select-none">
  <span>Current Category</span>
  <select
    id="current-category"
    name="current-category"
    class="mt-2 block rounded-md border-0 py-1.5 pl-2 pr-10 bg-white text-gray-900 ring-1 ring-black focus-visible"
    bind:value={$currentCategory}
  >
    {#each categories as option}
      <option value={option.value}>{option.label}</option>
    {/each}
  </select>
</label>
