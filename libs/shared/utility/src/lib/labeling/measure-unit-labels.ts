import { MeasureUnitSchema, type MeasureUnit } from '@kookio/prisma-client';

/**
 * Runtime list of every `MeasureUnit` in the schema, derived from the
 * generated zod enum. Centralised here so frontend consumers depend on the
 * small `@kookio/shared-utility` surface instead of importing the prisma
 * barrel at every call site. Safe post the `@kookio/prisma-client/server`
 * split: the root barrel is browser-safe (types + zod schemas only).
 */
export const MEASURE_UNITS = MeasureUnitSchema.options;

/**
 * Short display labels for measurement units. The `''` entries (PIECE, OTHER)
 * intentionally render as bare numbers in the UI — `5 PIECE` reads worse than
 * `5` when the ingredient name already disambiguates.
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

/**
 * Friendly labels for the unit dropdown. Spreads `MEASURE_UNIT_LABEL` and
 * fills in PIECE and OTHER (which are intentionally blank for inline use)
 * so every option in the select renders a non-empty label.
 */
export const MEASURE_UNIT_DROPDOWN_LABEL: Record<MeasureUnit, string> = {
  ...MEASURE_UNIT_LABEL,
  PIECE: 'piece',
  OTHER: 'other',
};

/**
 * Recipe-ingredient units treated as kitchen staples (salt, pepper, garnish):
 * skipped by the pantry-coverage check on the match endpoint and unchecked by
 * default in the cook-flow ingredient confirmation dialog. Single source of
 * truth so the server-side match helper and the client-side dialog cannot
 * drift on the policy.
 */
export const NEGLIGIBLE_MEASURE_UNITS: ReadonlySet<MeasureUnit> = new Set([
  'TO_TASTE',
  'TO_SERVE',
  'GARNISH',
  'PINCH',
]);
