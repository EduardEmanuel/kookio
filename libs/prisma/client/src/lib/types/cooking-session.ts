import z from 'zod';

import {
  CookingSessionModelSchema,
  IngredientCatalogModelSchema,
  MeasureUnitSchema,
  PantryItemModelSchema,
  RecipeIngredientModelSchema,
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
// IngredientConfirmDialog input shape
// ─────────────────────────────────────────────
//
// Constructed client-side by the cook page (`cook.[recipeId].page.ts`) from
// the public `recipes.byId` payload joined with a fresh `pantry.list` call,
// then passed into `IngredientConfirmDialogComponent`. There is no server
// procedure that returns this shape directly — the merge happens entirely
// in the browser so the SSR loader can stay on the public-recipe endpoint
// (Analog's page-server fetch is not auth-aware).

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
