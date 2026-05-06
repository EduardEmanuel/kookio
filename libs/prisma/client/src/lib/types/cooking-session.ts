import z from 'zod';

import {
  CookingSessionModelSchema,
  IngredientCatalogModelSchema,
  MeasureUnitSchema,
  PantryItemModelSchema,
  RecipeIngredientModelSchema,
  RecipeModelSchema,
} from '../../prisma-zod-generator/schemas/index';

import { UuidIdSchema } from './ids';

// ─────────────────────────────────────────────
// Mock — used by test factories under @kookio/shared-mock
// ─────────────────────────────────────────────

export const CookingSessionMockSchema = CookingSessionModelSchema.pick({
  id: true,
  userId: true,
  recipeId: true,
  servings: true,
  completedAt: true,
});
export type CookingSessionMock = z.output<typeof CookingSessionMockSchema>;

// ─────────────────────────────────────────────
// cookingSession.start
// ─────────────────────────────────────────────

const SERVINGS_MIN = 1;
const SERVINGS_MAX = 20;

export const CookingSessionStartInputSchema = z.object({
  recipeId: UuidIdSchema,
  servings: z.number().int().min(SERVINGS_MIN).max(SERVINGS_MAX),
});
export type CookingSessionStartInput = z.output<
  typeof CookingSessionStartInputSchema
>;

export const CookingSessionStartOutputSchema = z.object({
  sessionId: UuidIdSchema,
  createdAt: z.date(),
});
export type CookingSessionStartOutput = z.output<
  typeof CookingSessionStartOutputSchema
>;

// ─────────────────────────────────────────────
// cookingSession.complete
// ─────────────────────────────────────────────

/**
 * One ingredient line in a `complete` payload. `unit` mirrors the recipe-side
 * unit so the server can short-circuit pantry decrement when it does not match
 * the pantry item's stored unit — no automatic unit conversion is performed.
 */
export const CookingSessionConsumedItemSchema = z.object({
  ingredientCatalogId: UuidIdSchema,
  quantity: z.number().min(0),
  unit: MeasureUnitSchema,
});
export type CookingSessionConsumedItem = z.output<
  typeof CookingSessionConsumedItemSchema
>;

export const CookingSessionCompleteInputSchema = z.object({
  sessionId: UuidIdSchema,
  consumed: z.array(CookingSessionConsumedItemSchema),
});
export type CookingSessionCompleteInput = z.output<
  typeof CookingSessionCompleteInputSchema
>;

export const CookingSessionCompleteOutputSchema = z.object({
  sessionId: UuidIdSchema,
  completedAt: z.date(),
});
export type CookingSessionCompleteOutput = z.output<
  typeof CookingSessionCompleteOutputSchema
>;

// ─────────────────────────────────────────────
// cookingSession.getRecipeForSession
// ─────────────────────────────────────────────

export const GetRecipeForSessionInputSchema = z.object({
  recipeId: UuidIdSchema,
});
export type GetRecipeForSessionInput = z.output<
  typeof GetRecipeForSessionInputSchema
>;

const CookingIngredientCatalogSchema = IngredientCatalogModelSchema.pick({
  id: true,
  name: true,
  imageUrl: true,
  category: true,
});

/**
 * Pantry availability for a single ingredient. `null` means the user does not
 * currently have that ingredient — the dialog surfaces this as "not in pantry"
 * and leaves the row unchecked. `unit` is included so the UI can warn when the
 * recipe-side unit and the pantry-side unit differ.
 */
const CookingPantryAvailabilitySchema = PantryItemModelSchema.pick({
  quantity: true,
  unit: true,
});

const CookingRecipeIngredientSchema = RecipeIngredientModelSchema.pick({
  id: true,
  ingredientCatalogId: true,
  quantity: true,
  unit: true,
  notes: true,
}).extend({
  ingredient: CookingIngredientCatalogSchema,
  pantryAvailable: CookingPantryAvailabilitySchema.nullable(),
});
export type CookingRecipeIngredient = z.output<
  typeof CookingRecipeIngredientSchema
>;

/**
 * Lean recipe shape served to the cook page — only the fields the UI renders
 * (title for the header, servings for the ratio calculation, instructions for
 * the step list) plus ingredients enriched with pantry availability. Add
 * fields here only when the cook page actually starts rendering them.
 */
export const CookingRecipeForSessionSchema = RecipeModelSchema.pick({
  id: true,
  title: true,
  instructions: true,
  servings: true,
}).extend({
  ingredients: z.array(CookingRecipeIngredientSchema),
});
export type CookingRecipeForSession = z.output<
  typeof CookingRecipeForSessionSchema
>;
