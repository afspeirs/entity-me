import type { Entity } from '#lib/entities/types.js';

type FavouriteEntityId = Entity['description'];

const STORAGE_KEY = 'favourite-entities';

function getInitialValue(): FavouriteEntityId[] {
  if (typeof window === 'undefined') return [];

  const rawValue = window.localStorage.getItem(STORAGE_KEY);
  if (!rawValue) return [];

  const parsed = JSON.parse(rawValue) as string[];
  if (!Array.isArray(parsed) || parsed.length === 0) return [];

  return parsed as FavouriteEntityId[];
}

export const favouriteEntities = $state({
  value: getInitialValue(),
  set(value: FavouriteEntityId[]) {
    this.value = value;
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
  },
  update(value: FavouriteEntityId) {
    if (this.value.includes(value)) {
      this.set(this.value.filter((state) => state !== value));
    } else {
      this.set([...this.value, value]);
    }
  },
});
