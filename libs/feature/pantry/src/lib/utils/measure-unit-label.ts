import type { MeasureUnit } from '@kookio/prisma-client';

/**
 * Hardcoded list of every `MeasureUnit` in the schema. Importing
 * `MeasureUnitSchema` from `@kookio/prisma-client` at runtime drags the whole
 * Prisma client into the browser bundle (the barrel re-exports
 * `lib/prisma-client.ts` first; `Prisma.defineExtension` then throws because
 * Prisma is server-only). Keep this array in lock-step with the enum in
 * `libs/prisma/client/schema.prisma`. The `MEASURE_UNIT_LABEL` `Record` below
 * is the safety net: if a unit is added to the enum and TypeScript widens
 * `MeasureUnit`, the record's exhaustive key list breaks until updated.
 *
 * Final-functionality TODO: the pantry only really needs the measurable
 * subset; the recipe-only labels (`TO_TASTE`, `TO_SERVE`, `GARNISH`, `OTHER`)
 * are kept pending the menu/shopping-list UX decision in week 6 — drop them
 * then if they never make sense for a stored pantry quantity.
 */
export const MEASURE_UNITS = [
  'G',
  'KG',
  'ML',
  'L',
  'TSP',
  'TBSP',
  'CUP',
  'OZ',
  'LB',
  'PIECE',
  'SLICE',
  'CLOVE',
  'BUNCH',
  'PINCH',
  'TO_TASTE',
  'TO_SERVE',
  'GARNISH',
  'OTHER',
] as const satisfies readonly MeasureUnit[];

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
