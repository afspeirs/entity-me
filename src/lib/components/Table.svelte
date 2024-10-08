<script lang="ts">
  import Icon from '@iconify/svelte';

  import TableCell from '$lib/components/TableCell.svelte';
  import TableHeader from '$lib/components/TableHeader.svelte';
  import TablePagination from '$lib/components/TablePagination.svelte';
  import { headings } from '$lib/entities';
  import type { CategoryValue, Entity } from '$lib/entities/types';
  import { currentCategory } from '$lib/stores/current-category';
  import { favouriteEntities } from '$lib/stores/favourite-entities';
  import { hiddenColumns } from '$lib/stores/hidden-columns';
  import { search } from '$lib/stores/search';
  import { classNames } from '$lib/utils/classNames';

  async function getEntities(category: CategoryValue) {
    const entities = await import('../entities');

    if (category === 'favourites') {
      return entities.default.filter((entity) => $favouriteEntities.includes(entity.description));
    }

    return entities[category] || [];
  }

  function updateFavouriteEntities(value: string) {
    favouriteEntities.update((prevState) => {
      if ($favouriteEntities.includes(value)) {
        return prevState.filter((state) => state !== value);
      } else {
        return [...prevState, value];
      }
    });
  }

  function filter(items: Entity[]) {
    if (!items) return [];
    return items?.filter((item) => (
      item.character?.includes($search)
      || item.decimal?.includes($search)
      || item.hex?.includes($search)
      || item.entity?.includes($search)
      || item.description?.toLowerCase()?.includes($search.toLowerCase())
      || item.note?.toLowerCase()?.includes($search.toLowerCase())
    )) || [];
  }

  let values: Entity[];
  $: entities = getEntities($currentCategory);
</script>

<div class="flow-root min-w-full align-middle px-safe pb-safe sm:px-safe-offset-4 sm:pt-4 sm:pb-safe-offset-4">
  <div class="shadow ring-1 ring-black ring-opacity-5">
    <table class="min-w-full border-separate border-spacing-0 divide-y divide-gray-300">
      <thead>
        <tr>
          {#each headings as heading}
            <TableHeader hidden={$hiddenColumns.includes(heading)}>{heading}</TableHeader>
          {/each}
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-200 bg-white">
        {#if $hiddenColumns.length === headings.length}
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
              <TableCell colspan={6}>No results found for "{$search}"</TableCell>
            </tr>
          {/if}
          {#each filteredItems as entity, entityIdx}
            <tr class={classNames(entityIdx === 0 ? 'border-gray-300' : 'border-gray-200', 'border-t')}>
              <TableCell
                column="character"
                hidden={$hiddenColumns.includes('character')}
                label={entity.character}
              />
              <TableCell
                column="decimal"
                hidden={$hiddenColumns.includes('decimal')}
                label={`&#${entity.decimal};`}
              />
              <TableCell
                column="hex"
                hidden={$hiddenColumns.includes('hex')}
                label={`&#x${entity.hex.padStart(4, '0')};`}
              />
              <TableCell
                column="entity"
                hidden={$hiddenColumns.includes('entity')}
                label={entity.entity}
              />
              <TableCell
                column="description"
                hidden={$hiddenColumns.includes('description')}
                label={entity.description}
              />
              <TableCell
                column="note"
                hidden={$hiddenColumns.includes('note')}
                label={entity.note}
              />
              <TableCell
                column="favourite"
                hidden={$hiddenColumns.includes('favourite')}
              >
                {@const favourite = $favouriteEntities.includes(entity.description)}
                <Icon
                  icon={favourite ? "lucide:heart" : 'lucide:heart-off'}
                  class={classNames(
                    "size-5 text-primary",
                    favourite ? '[&>*]:fill-primary' : ''
                  )}
                  aria-hidden="true"
                />
                <button
                  type="button"
                  class="absolute inset-0 hover:bg-black/5"
                  on:click={() => updateFavouriteEntities(entity.description)}
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
