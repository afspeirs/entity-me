import type { categories } from '.';

export type Entity = {
  character: string;
  decimal: string;
  hex: string;
  entity: string;
  description: string;
  note: string;
};

export type Heading = keyof Entity | 'favourite';

export type CategoryValue = (typeof categories)[number]['value'];
export type CategoryLabel = (typeof categories)[number]['label'];
