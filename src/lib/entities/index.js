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

export const headings = Object.keys(latinBasic[0]);

export const categories = [
  {
    value: 'latinBasic',
    label: 'latin basic',
  },
  {
    value: 'latinSupplement',
    label: 'latin supplement',
  },
  {
    value: 'latinExtendedA',
    label: 'latin extended a',
  },
  {
    value: 'latinExtendedB',
    label: 'latin extended b',
  },
  {
    value: 'latinIpa',
    label: 'latin ipa',
  },
  {
    value: 'modifierLetters',
    label: 'modifier letters',
  },
  {
    value: 'diacriticalMarks',
    label: 'diacritical marks',
  },
  {
    value: 'greekAndCoptic',
    label: 'greek and coptic',
  },
  {
    value: 'cyrillic',
    label: 'cyrillic',
  },
  {
    value: 'punctuation',
    label: 'punctuation',
  },
  {
    value: 'currency',
    label: 'currency',
  },
  {
    value: 'letterLikeSymbols',
    label: 'letter like symbols',
  },
  {
    value: 'numberForms',
    label: 'number forms',
  },
  {
    value: 'arrows',
    label: 'arrows',
  },
  {
    value: 'mathematicalOperators',
    label: 'mathematical operators',
  },
  {
    value: 'miscellaneousTechnical',
    label: 'miscellaneous technical',
  },
  {
    value: 'enclosedAlphanumerics',
    label: 'enclosed alphanumerics',
  },
  {
    value: 'boxDrawings',
    label: 'box drawings',
  },
  {
    value: 'blockElements',
    label: 'block elements',
  },
  {
    value: 'geometricShapes',
    label: 'geometric shapes',
  },
  {
    value: 'miscellaneousSymbols',
    label: 'miscellaneous symbols',
  },
  {
    value: 'dingbats',
    label: 'dingbats',
  },
  {
    value: 'braille',
    label: 'braille',
  },
  {
    value: 'tilesAndPlayingCards',
    label: 'tiles and playing cards',
  },
  {
    value: 'coloredSymbols',
    label: 'colored symbols',
  },
  {
    value: 'default',
    label: 'All (EXPERIMENTAL)',
  },
];

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
