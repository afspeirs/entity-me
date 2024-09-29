import latinBasic from './1-latin-basic.json';
import latinSupplement from './2-latin-supplement.json';
import latinExtendedA from './3-latin-extended-a.json';
import latinExtendedB from './4-latin-extended-b.json';
import latinIpa from './5-latin-ipa.json';
import modifierLetters from './6-modifier-letters.json';
import diacriticalMarks from './7-diacritical-marks.json';
import greekAndCoptic from './8-greek-and-coptic.json';
import cyrillic from './9-cyrillic.json';
import punctuation from './10-punctuation.json';
import currency from './11-currency.json';
import letterLikeSymbols from './12-letter-like-symbols.json';
import numberForms from './13-number-forms.json';
import arrows from './14-arrows.json';
import mathematicalOperators from './15-mathematical-operators.json';
import miscellaneousTechnical from './16-miscellaneous-technical.json';
import enclosedAlphanumerics from './17-enclosed-alphanumerics.json';
import boxDrawings from './18-box-drawings.json';
import blockElements from './19-block-elements.json';
import geometricShapes from './20-geometric-shapes.json';
import miscellaneousSymbols from './21-miscellaneous-symbols.json';
import dingbats from './22-dingbats.json';
import braille from './23-braille.json';
import tilesAndPlayingCards from './24-tiles-and-playing-cards.json';
import coloredSymbols from './25-colored-symbols.json';
import type { Entity, Heading } from './types';

export const headings = [
  ...Object.keys(latinBasic[0]) as (keyof Entity)[],
  'favourite',
] as Heading[];

export const categories = [
  {
    value: 'default',
    label: 'All',
  },
  {
    value: 'favourites',
    label: 'Favourites',
  },
  {
    value: 'latinBasic',
    label: 'Latin basic',
  },
  {
    value: 'latinSupplement',
    label: 'Latin supplement',
  },
  {
    value: 'latinExtendedA',
    label: 'Latin extended a',
  },
  {
    value: 'latinExtendedB',
    label: 'Latin extended b',
  },
  {
    value: 'latinIpa',
    label: 'Latin ipa',
  },
  {
    value: 'modifierLetters',
    label: 'Modifier letters',
  },
  {
    value: 'diacriticalMarks',
    label: 'Diacritical marks',
  },
  {
    value: 'greekAndCoptic',
    label: 'Greek and coptic',
  },
  {
    value: 'cyrillic',
    label: 'Cyrillic',
  },
  {
    value: 'punctuation',
    label: 'Punctuation',
  },
  {
    value: 'currency',
    label: 'Currency',
  },
  {
    value: 'letterLikeSymbols',
    label: 'Letter like symbols',
  },
  {
    value: 'numberForms',
    label: 'Number forms',
  },
  {
    value: 'arrows',
    label: 'Arrows',
  },
  {
    value: 'mathematicalOperators',
    label: 'Mathematical operators',
  },
  {
    value: 'miscellaneousTechnical',
    label: 'Miscellaneous technical',
  },
  {
    value: 'enclosedAlphanumerics',
    label: 'Enclosed alphanumerics',
  },
  {
    value: 'boxDrawings',
    label: 'Box drawings',
  },
  {
    value: 'blockElements',
    label: 'Block elements',
  },
  {
    value: 'geometricShapes',
    label: 'Geometric shapes',
  },
  {
    value: 'miscellaneousSymbols',
    label: 'Miscellaneous symbols',
  },
  {
    value: 'dingbats',
    label: 'Dingbats',
  },
  {
    value: 'braille',
    label: 'Braille',
  },
  {
    value: 'tilesAndPlayingCards',
    label: 'Tiles and playing cards',
  },
  {
    value: 'coloredSymbols',
    label: 'Coloured symbols',
  },
] as const;

export const categoryValues = categories.map((category) => category.value);
export const categoryLabels = categories.map((category) => category.label);


export {
  latinBasic,
  latinSupplement,
  latinExtendedA,
  latinExtendedB,
  latinIpa,
  modifierLetters,
  diacriticalMarks,
  greekAndCoptic,
  cyrillic,
  punctuation,
  currency,
  letterLikeSymbols,
  numberForms,
  arrows,
  mathematicalOperators,
  miscellaneousTechnical,
  enclosedAlphanumerics,
  boxDrawings,
  blockElements,
  geometricShapes,
  miscellaneousSymbols,
  dingbats,
  braille,
  tilesAndPlayingCards,
  coloredSymbols,
};

export default [
  ...latinBasic,
  ...latinSupplement,
  ...latinExtendedA,
  ...latinExtendedB,
  ...latinIpa,
  ...modifierLetters,
  ...diacriticalMarks,
  ...greekAndCoptic,
  ...cyrillic,
  ...punctuation,
  ...currency,
  ...letterLikeSymbols,
  ...numberForms,
  ...arrows,
  ...mathematicalOperators,
  ...miscellaneousTechnical,
  ...enclosedAlphanumerics,
  ...boxDrawings,
  ...blockElements,
  ...geometricShapes,
  ...miscellaneousSymbols,
  ...dingbats,
  ...braille,
  ...tilesAndPlayingCards,
  ...coloredSymbols,
];
