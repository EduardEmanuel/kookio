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

/**
 * Same-family unit conversion factors, expressed against the canonical
 * base unit of each family:
 *   - weight: grams
 *   - volume: millilitres
 *
 * Cooking-grade rounding is intentional. The technically-correct US
 * standard `1 TSP = 4.92892 ML` doesn't help here because recipe source
 * data is human-written at whole-tsp/tbsp/cup precision anyway, and
 * rounded factors keep user-facing converted values readable (`200 ml`
 * vs `197.16 ml`). Swap to the exact factors if the dataset moves to a
 * precision-sensitive domain (lab / pharma / patisserie).
 */
const WEIGHT_TO_GRAMS: Partial<Record<MeasureUnit, number>> = {
  G: 1,
  KG: 1000,
  OZ: 28.3495,
  LB: 453.592,
};

const VOLUME_TO_ML: Partial<Record<MeasureUnit, number>> = {
  ML: 1,
  L: 1000,
  TSP: 5,
  TBSP: 15,
  CUP: 240,
};

/**
 * Returns `amount` converted from `from` to `to` when both units belong
 * to the same family (weight or volume). Returns `null` for cross-family
 * conversions and for unitless / imprecise units — PIECE, SLICE, CLOVE,
 * BUNCH, PINCH, TO_TASTE, TO_SERVE, GARNISH, OTHER only compare
 * meaningfully to themselves, and crossing families (e.g. ml ↔ g)
 * requires ingredient-specific density data that the project does not
 * ship.
 */
export const convertMeasure = (
  amount: number,
  from: MeasureUnit,
  to: MeasureUnit,
): number | null => {
  if (from === to) return amount;

  const weightFrom = WEIGHT_TO_GRAMS[from];
  const weightTo = WEIGHT_TO_GRAMS[to];
  if (weightFrom !== undefined && weightTo !== undefined) {
    return (amount * weightFrom) / weightTo;
  }

  const volFrom = VOLUME_TO_ML[from];
  const volTo = VOLUME_TO_ML[to];
  if (volFrom !== undefined && volTo !== undefined) {
    return (amount * volFrom) / volTo;
  }

  return null;
};

/**
 * Returns true when `unit` belongs to a convertible family (weight or
 * volume). Cheap predicate for callers that only need to know whether a
 * meaningful conversion is possible without computing the result.
 */
export const isConvertibleUnit = (unit: MeasureUnit): boolean =>
  WEIGHT_TO_GRAMS[unit] !== undefined || VOLUME_TO_ML[unit] !== undefined;
