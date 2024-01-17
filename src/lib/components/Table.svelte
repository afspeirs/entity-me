<script>
  import { headings } from '../entities';
  import { currentCategory } from '../stores/current-category';
  import { hiddenColumns } from '../stores/hidden-columns';
  import { search } from '../stores/search';
  import { classNames } from '../utils/classNames';
  import TableCell from './TableCell.svelte';
  import TableHeader from './TableHeader.svelte';
  import TablePagination from './TablePagination.svelte';

  async function getEntities(category) {
    const entities = await import('../entities');
    return entities[category];
  }

  function filter(items) {
    if (!items) return [];
    return items.filter((item) => (
      item.character.includes($search)
      || item.decimal.includes($search)
      || item.hex.includes($search)
      || item.entity.includes($search)
      || item.description.toLowerCase().includes($search.toLowerCase())
      || item.note.toLowerCase().includes($search.toLowerCase())
    )) || [];
  }

  let values;
  $: entities = getEntities($currentCategory);
</script>

<div class="px-4 sm:px-6">
  <div class="mt-4 flow-root">
    <div class="-mx-4 -my-4 sm:-mx-6">
      <div class="inline-block min-w-full py-4 align-middle sm:px-4">
        <div class="shadow ring-1 ring-black ring-opacity-5">
          <table class="min-w-full border-separate border-spacing-0 divide-y divide-gray-300">
            <thead>
              <tr>
                <TableHeader hidden={$hiddenColumns.includes('character')}>Character</TableHeader>
                <TableHeader hidden={$hiddenColumns.includes('decimal')}>Decimal</TableHeader>
                <TableHeader hidden={$hiddenColumns.includes('hex')}>Hex</TableHeader>
                <TableHeader hidden={$hiddenColumns.includes('entity')}>Entity</TableHeader>
                <TableHeader hidden={$hiddenColumns.includes('description')}>Description</TableHeader>
                <TableHeader hidden={$hiddenColumns.includes('note')}>Note</TableHeader>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 bg-white">
              {#if $hiddenColumns.length === headings.length}
                <tr>
                  <TableCell colspan="6">Error: All columns are hidden</TableCell>
                </tr>
              {/if}
              {#await entities}
                <tr>
                  <TableCell colspan="6">Loading...</TableCell>
                </tr>
              {:then items}
                {@const filteredItems = filter(values)}
                {#each filteredItems as entity, entityIdx}
                  <tr class={classNames(entityIdx === 0 ? 'border-gray-300' : 'border-gray-200', 'border-t')}>
                    <TableCell hidden={$hiddenColumns.includes('character')}>{entity.character}</TableCell>
                    <TableCell hidden={$hiddenColumns.includes('decimal')}>{`&#${entity.decimal || '-'};`}</TableCell>
                    <TableCell hidden={$hiddenColumns.includes('hex')}>{`&#x${entity.hex.padStart(4, '0') || '-'};`}</TableCell>
                    <TableCell hidden={$hiddenColumns.includes('entity')}>{entity.entity || '-'}</TableCell>
                    <TableCell hidden={$hiddenColumns.includes('description')}>{entity.description || '-'}</TableCell>
                    <TableCell hidden={$hiddenColumns.includes('note')}>{entity.note || '-'}</TableCell>
                  </tr>
                {/each}
              {:catch error}
                <tr>
                  <TableCell colspan="6">Something went wrong: {error.message}</TableCell>
                </tr>
              {/await}
            </tbody>
          </table>
          {#key $search}
            {#await entities then items}
              <TablePagination
                items={filter(items)}
                bind:trimmedData={values}
              />
            {/await}
          {/key}
        </div>
      </div>
    </div>
  </div>
</div>
