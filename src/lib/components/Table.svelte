<script lang="ts">
  import { HeartIcon, HeartOffIcon } from '@lucide/svelte';

  import TableCell from '$lib/components/TableCell.svelte';
  import TableHeader from '$lib/components/TableHeader.svelte';
  import TablePagination from '$lib/components/TablePagination.svelte';
  import { currentCategory } from '$lib/context/current-category.svelte';
  import { favouriteEntities } from '$lib/context/favourite-entities.svelte';
  import { hiddenColumns } from '$lib/context/hidden-columns.svelte';
  import { search } from '$lib/context/search.svelte';
  import { headings } from '$lib/entities';
  import type { CategoryValue, Entity } from '$lib/entities/types';

  async function getEntities(category: CategoryValue) {
    const entities = await import('../entities');

    if (category === 'favourites') {
      return entities.default.filter((entity) => favouriteEntities.value.includes(entity.description));
    }

    return entities[category] || [];
  }

  let paginatedEntities: Entity[] = $state([]);
  const entitiesPromise = $derived(getEntities(currentCategory.value));
  const filteredItemsPromise = $derived(
    entitiesPromise.then((items) =>
      items.filter(
        (item) =>
          item.character?.includes(search.value) ||
          item.decimal?.includes(search.value) ||
          item.hex?.includes(search.value) ||
          item.entity?.includes(search.value) ||
          item.description?.toLowerCase()?.includes(search.value.toLowerCase()) ||
          item.note?.toLowerCase()?.includes(search.value.toLowerCase()),
      ),
    ),
  );
  const maxColumns = headings.length;
</script>

<div class="flow-root min-w-full align-middle px-safe pb-safe">
  <div class="shadow-sm ring-1 ring-black/5">
    <table class="min-w-full border-separate border-spacing-0 divide-y divide-gray-300">
      <thead>
        <tr>
          {#each headings as heading (heading)}
            <TableHeader hidden={hiddenColumns.value.includes(heading)}>{heading}</TableHeader>
          {/each}
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-200 bg-white dark:bg-dark">
        {#await filteredItemsPromise}
          <tr>
            <TableCell colspan={maxColumns}>Loading...</TableCell>
          </tr>
        {:then filteredItems}
          {#if hiddenColumns.value.length === maxColumns}
            <tr>
              <TableCell colspan={maxColumns}>Error: All columns are hidden</TableCell>
            </tr>
          {:else if filteredItems.length === 0}
            <tr>
              <TableCell colspan={maxColumns}>
                {#if currentCategory.value === 'favourites' && search.value.length === 0}
                  No favourites found
                {:else}
                  No results found for "{search.value}"
                {/if}
              </TableCell>
            </tr>
          {:else}
            {#each paginatedEntities as entity, entityIdx (entity.decimal)}
              <tr class="border-t {entityIdx === 0 ? 'border-gray-300' : 'border-gray-200'}">
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

                  {#if favourite}
                    <HeartIcon class="size-5 text-primary *:fill-primary" aria-hidden="true" />
                  {:else}
                    <HeartOffIcon class="size-5 text-primary" aria-hidden="true" />
                  {/if}

                  <button
                    type="button"
                    class="absolute inset-0 hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer focus-outline-inset"
                    onclick={() => favouriteEntities.update(entity.description)}
                  >
                    <span class="sr-only">{favourite ? 'Favourite' : 'Not a favourite'}</span>
                  </button>
                </TableCell>
              </tr>
            {/each}
          {/if}
        {:catch error}
          <tr>
            <TableCell colspan={maxColumns}>Something went wrong: {error.message}</TableCell>
          </tr>
        {/await}
      </tbody>
    </table>
    {#await filteredItemsPromise then filteredItems}
      <TablePagination items={filteredItems} bind:trimmedData={paginatedEntities} />
    {/await}
  </div>
</div>
