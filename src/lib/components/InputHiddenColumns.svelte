<script>
  import { headings } from '../entities';
  import { hiddenColumns } from '../stores/hidden-columns';
</script>

<fieldset class="my-2 space-y-1 select-none">
  <legend>Which columns do you want to hide?</legend>
  {#each headings as heading}
    <div class="relative flex gap-2 items-center">
      <input
        id={`checkbox_${heading}`}
        type="checkbox"
        bind:group={$hiddenColumns}
        value={heading}
        class="w-4 h-4 rounded accent-primary focus-visible ring-offset-1"
      >
      <label
        for={`checkbox_${heading}`}
        class="capitalize"
      >
        {heading}
      </label>
    </div>
  {/each}
</fieldset>
