<script lang="ts">
  import Icon from '@iconify/svelte';

  import TableCell from '$lib/components/TableCell.svelte';
  import TableHeader from '$lib/components/TableHeader.svelte';
  import TablePagination from '$lib/components/TablePagination.svelte';
  import { headings } from '$lib/entities';
  import type { CategoryValue, Entity } from '$lib/entities/types';
  import { currentCategory } from '$lib/context/current-category.svelte';
  import { favouriteEntities } from '$lib/context/favourite-entities.svelte';
  import { hiddenColumns } from '$lib/context/hidden-columns.svelte';
  import { search } from '$lib/context/search.svelte';
  import { classNames } from '$lib/utils/classNames';

  async function getEntities(category: CategoryValue) {
    const entities = await import('../entities');

    if (category === 'favourites') {
      return entities.default.filter((entity) => favouriteEntities.value.includes(entity.description));
    }

    return entities[category] || [];
  }

  function filter(items: Entity[]) {
    if (!items) return [];
    return (
      items?.filter(
        (item) =>
          item.character?.includes(search.value) ||
          item.decimal?.includes(search.value) ||
          item.hex?.includes(search.value) ||
          item.entity?.includes(search.value) ||
          item.description?.toLowerCase()?.includes(search.value.toLowerCase()) ||
          item.note?.toLowerCase()?.includes(search.value.toLowerCase()),
      ) || []
    );
  }

  let values: Entity[] = $state([]);
  const entities = $derived(getEntities(currentCategory.value));
</script>

<div class="flow-root min-w-full align-middle px-safe pb-safe sm:px-safe-offset-4 sm:pt-4 sm:pb-safe-offset-4">
  <div class="shadow ring-1 ring-black ring-opacity-5">
    <table class="min-w-full border-separate border-spacing-0 divide-y divide-gray-300">
      <thead>
        <tr>
          {#each headings as heading}
            <TableHeader hidden={hiddenColumns.value.includes(heading)}>{heading}</TableHeader>
          {/each}
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-200 bg-white dark:bg-dark">
        {#if hiddenColumns.value.length === headings.length}
          <tr>
            <TableCell colspan={6}>Error: All columns are hidden</TableCell>
          </tr>
        {/if}
        {#await entities}
          <tr>
            <TableCell colspan={6}>Loading...</TableCell>
          </tr>
        {:then items} <!-- eslint-disable-line @typescript-eslint/no-unused-vars -->
          {@const filteredItems = filter(values)}
          {#if filteredItems.length === 0}
            <tr>
              <TableCell colspan={6}>
                {#if currentCategory.value === 'favourites' && search.value.length === 0}
                  No favourites found
                {:else}
                  No results found for "{search.value}"
                {/if}
              </TableCell>
            </tr>
          {/if}
          {#each filteredItems as entity, entityIdx}
            <tr
              class={classNames(
                entityIdx === 0 ? 'border-gray-300' : 'border-gray-200',
                'border-t',
              )}
            >
              <TableCell
                column="character"
                hidden={hiddenColumns.value.includes('character')}
                label={entity.character}
              />
              <TableCell
                column="decimal"
                hidden={hiddenColumns.value.includes('decimal')}
                label={`&#${entity.decimal};`}
              />
              <TableCell
                column="hex"
                hidden={hiddenColumns.value.includes('hex')}
                label={`&#x${entity.hex.padStart(4, '0')};`}
              />
              <TableCell
                column="entity"
                hidden={hiddenColumns.value.includes('entity')}
                label={entity.entity}
              />
              <TableCell
                column="description"
                hidden={hiddenColumns.value.includes('description')}
                label={entity.description}
              />
              <TableCell
                column="note"
                hidden={hiddenColumns.value.includes('note')}
                label={entity.note}
              />
              <TableCell column="favourite" hidden={hiddenColumns.value.includes('favourite')}>
                {@const favourite = favouriteEntities.value.includes(entity.description)}
                <Icon
                  icon={favourite ? 'lucide:heart' : 'lucide:heart-off'}
                  class={classNames('size-5 text-primary', favourite ? '[&>*]:fill-primary' : '')}
                  aria-hidden="true"
                />
                <button
                  type="button"
                  class="absolute inset-0 hover:bg-black/5 dark:hover:bg-white/5"
                  onclick={() => favouriteEntities.update(entity.description)}
                >
                  <span class="sr-only">{favourite ? 'Favourite' : 'Not a favourite'}</span>
                </button>
              </TableCell>
            </tr>
          {/each}
        {:catch error}
          <tr>
            <TableCell colspan={6}>Something went wrong: {error.message}</TableCell>
          </tr>
        {/await}
      </tbody>
    </table>
    {#key search.value}
      {#await entities then items}
        <TablePagination items={filter(items)} bind:trimmedData={values} />
      {/await}
    {/key}
  </div>
</div>
