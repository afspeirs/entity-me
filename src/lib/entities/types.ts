import type { categoryLabels, categoryValues } from '.';

export type Entity = {
  character: string;
  decimal: string;
  hex: string;
  entity: string;
  description: string;
  note: string;
};

export type Heading = keyof Entity | 'favourite';

export type CategoryValue = (typeof categoryValues)[number];
export type CategoryLabel = (typeof categoryLabels)[number];
