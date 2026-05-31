import { z } from 'zod';

/** Progressive pantry-match tiers. Source of truth — pinned via z.enum. */
export const RecipeMatchLevelSchema = z.enum(['Alright', 'Almost', 'All']);
export type RecipeMatchLevel = z.output<typeof RecipeMatchLevelSchema>;

/** Array for UI iteration (toggle group). Cannot drift from the schema. */
export const RECIPE_MATCH_LEVELS = RecipeMatchLevelSchema.options;

/**
 * Exhaustive hint copy per level — a schema rename breaks compilation here
 * (schema-change canary).
 */
export const RECIPE_MATCH_LEVEL_HINT: Record<RecipeMatchLevel, string> = {
  Alright: 'Recipes you can cook right now with your pantry.',
  Almost: "Recipes where you're missing 1–3 ingredients.",
  All: 'All available recipes.',
};
