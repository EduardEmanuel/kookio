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

/**
 * Fallback mass per "piece" when the catalog row has no `pieceGrams` value
 * and the unit is piece-class (PIECE/SLICE/CLOVE/BUNCH/OTHER). Same number
 * the thesis Phase 2b `clean-recipes.ts` pipeline uses for unknown
 * ingredients in its serving-size derivation — kept in sync so the offline
 * cleanup and runtime pantry math share a single defensible heuristic.
 *
 * Exposed publicly so the cook dialog can render an "approx." tag when a
 * row falls back to this value, prompting the user to override before
 * confirming a pantry decrement.
 */
export const DEFAULT_PIECE_GRAMS = 100;

/**
 * Pure-flavouring units: 0 g contribution to bulk mass. Aggregating them
 * over a meal plan is meaningless ("3 garnish") and decrementing 0 g
 * against a pantry row is a no-op. Kept in their own set so callers can
 * detect "this is a flavour-only line item, surface it but skip the math".
 */
const FLAVOUR_ONLY_UNITS: ReadonlySet<MeasureUnit> = new Set([
  'TO_TASTE',
  'TO_SERVE',
  'GARNISH',
]);

/**
 * Predicate matching {@link FLAVOUR_ONLY_UNITS}. Use this in derive/filter
 * paths that want to exclude meaningless aggregations (e.g. dropping
 * "3 garnish" rows from a shopping list) without re-importing the set
 * itself. PINCH is NOT flavour-only — it's a small but real mass.
 */
export const isFlavourOnlyUnit = (unit: MeasureUnit): boolean =>
  FLAVOUR_ONLY_UNITS.has(unit);

/**
 * Fixed mass-per-unit factors for every unit whose grams value is
 * ingredient-agnostic. Weight factors are precise; volume factors use
 * water density (1 g/ml), matching the cooking-grade approximation
 * documented in thesis Phase 2b. PINCH is 0.5 g — small enough to be a
 * rounding floor, big enough to honestly decrement a pantry row when the
 * user actively tracks salt.
 *
 * PIECE/SLICE/CLOVE/BUNCH/OTHER are excluded — they need a per-ingredient
 * `pieceGrams` value to resolve. TO_TASTE/TO_SERVE/GARNISH are excluded —
 * they're flavour-only (0 g, handled by the FLAVOUR_ONLY_UNITS path).
 */
const UNIT_TO_GRAMS_FIXED: Partial<Record<MeasureUnit, number>> = {
  G: 1,
  KG: 1000,
  OZ: 28.3495,
  LB: 453.592,
  ML: 1,
  L: 1000,
  TSP: 5,
  TBSP: 15,
  CUP: 240,
  PINCH: 0.5,
};

/**
 * Options for {@link toGrams} / {@link fromGrams}.
 *
 * `allowDefault: true` lets the caller opt into the
 * {@link DEFAULT_PIECE_GRAMS} fallback for piece-class units that have no
 * `pieceGrams` value on the catalog row. The cook dialog passes `true`
 * (so the row stays actionable, just flagged as an approximation); the
 * server-side cooking-session decrement passes `false` (so a missing
 * pieceGrams becomes an explicit skip rather than a silent guess).
 */
export interface GramsConversionOptions {
  readonly allowDefault?: boolean;
}

/**
 * Convert any amount-and-unit to grams.
 *
 * Returns:
 *  - **number** — grams equivalent.
 *  - **0** — flavour-only unit (TO_TASTE/TO_SERVE/GARNISH). Valid result;
 *    callers that treat 0 as "skip" should branch on the unit, not the value.
 *  - **null** — piece-class unit (PIECE/SLICE/CLOVE/BUNCH/OTHER) without a
 *    `pieceGrams` value on the catalog row AND `opts.allowDefault` is false.
 *    Caller decides: skip the operation, surface a warning, etc.
 *
 * Same heuristic as thesis Phase 2b `clean-recipes.ts` — water density for
 * volumes, per-ingredient mass for piece units, 0.5 g for PINCH. Single
 * source of truth across the offline cleanup and runtime pantry math.
 */
export const toGrams = (
  amount: number,
  unit: MeasureUnit,
  pieceGrams: number | null = null,
  opts: GramsConversionOptions = {},
): number | null => {
  if (FLAVOUR_ONLY_UNITS.has(unit)) return 0;

  const fixed = UNIT_TO_GRAMS_FIXED[unit];
  if (fixed !== undefined) return amount * fixed;

  // Piece-class: PIECE, SLICE, CLOVE, BUNCH, OTHER.
  const piece =
    pieceGrams !== null && pieceGrams > 0
      ? pieceGrams
      : opts.allowDefault
        ? DEFAULT_PIECE_GRAMS
        : null;
  if (piece === null) return null;
  return amount * piece;
};

/**
 * Inverse of {@link toGrams} — express a gram quantity in the user's
 * display unit. Used after a decrement to redisplay the remaining pantry
 * quantity in the row's stored unit rather than as raw grams.
 *
 * Returns the same `null` cases as `toGrams`: piece-class without a
 * `pieceGrams` value and `allowDefault: false`. Returns 0 for flavour-only
 * units (they decrement nothing, so they "remain" at 0 in their own unit).
 */
export const fromGrams = (
  grams: number,
  unit: MeasureUnit,
  pieceGrams: number | null = null,
  opts: GramsConversionOptions = {},
): number | null => {
  if (FLAVOUR_ONLY_UNITS.has(unit)) return 0;

  const fixed = UNIT_TO_GRAMS_FIXED[unit];
  if (fixed !== undefined) return grams / fixed;

  const piece =
    pieceGrams !== null && pieceGrams > 0
      ? pieceGrams
      : opts.allowDefault
        ? DEFAULT_PIECE_GRAMS
        : null;
  if (piece === null) return null;
  return grams / piece;
};
