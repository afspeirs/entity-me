import type { Entity } from '$lib/entities/types';

const initialValue = JSON.parse(window.localStorage.getItem('favourite-entities') || '[]') as Entity['description'][];

export const favouriteEntities = $state({
  value: initialValue,
  set(value: Entity['description'][]) {
    this.value = value;
    window.localStorage.setItem('favourite-entities', JSON.stringify(value));
  },
  update(value: string) {
    if (this.value.includes(value)) {
      this.set(this.value.filter((state) => state !== value));
    } else {
      this.set([...this.value, value]);
    }
  },
});
