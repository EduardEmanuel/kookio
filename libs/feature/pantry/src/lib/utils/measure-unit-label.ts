import type { MeasureUnit } from '@kookio/prisma-client';

/**
 * Short display labels for measurement units. The `''` entries (PIECE, OTHER)
 * intentionally render as bare numbers in the UI — `5 PIECE` reads worse than
 * `5` when the ingredient name already disambiguates.
 *
 * Eventual de-duplication candidate: `apps/web/src/app/pages/recipes.[id].page.ts`
 * carries an identical map. Lift to `libs/shared/utility/labeling/` if a third
 * surface needs the same labels.
 */
export const MEASURE_UNIT_LABEL: Record<MeasureUnit, string> = {
  G: 'g',
  KG: 'kg',
  ML: 'ml',
  L: 'l',
  TSP: 'tsp',
  TBSP: 'tbsp',
  CUP: 'cup',
  OZ: 'oz',
  LB: 'lb',
  PIECE: '',
  SLICE: 'slice',
  CLOVE: 'clove',
  BUNCH: 'bunch',
  PINCH: 'pinch',
  TO_TASTE: 'to taste',
  TO_SERVE: 'to serve',
  GARNISH: 'garnish',
  OTHER: '',
};

export const formatMeasureUnit = (unit: MeasureUnit | null): string =>
  unit ? (MEASURE_UNIT_LABEL[unit] ?? '') : '';
