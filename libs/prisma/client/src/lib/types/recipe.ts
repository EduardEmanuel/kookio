import z from 'zod';

import {
  DifficultySchema,
  IngredientCatalogModelSchema,
  MealAreaModelSchema,
  MealCategoryModelSchema,
  RecipeIngredientModelSchema,
  RecipeInputSchema,
  RecipeModelSchema,
  RecipeTagModelSchema,
} from '../../prisma-zod-generator/schemas/index';

import { RecipeIngredientSeedRowSchema } from './recipe-ingredient';
import { RecipeStepDetailSchema, RecipeStepSeedRowSchema } from './recipe-step';
import { RecipeTagSeedRowSchema } from './recipe-tag';

export const RecipeSeedRowSchema = RecipeInputSchema.pick({
  externalId: true,
  slug: true,
  title: true,
  imageUrl: true,
  videoUrl: true,
  sourceUrl: true,
  servings: true,
}).extend({
  difficulty: DifficultySchema.nullable(),
  categoryExternalId: z.string().nullable(),
  areaExternalId: z.string().nullable(),
  tags: z.array(RecipeTagSeedRowSchema),
  ingredients: z.array(RecipeIngredientSeedRowSchema),
  steps: z.array(RecipeStepSeedRowSchema),
});
export type RecipeSeedRow = z.output<typeof RecipeSeedRowSchema>;

const RecipeFeedCategorySchema = MealCategoryModelSchema.pick({
  id: true,
  name: true,
  emoji: true,
});

const RecipeFeedAreaSchema = MealAreaModelSchema.pick({
  id: true,
  name: true,
  flag: true,
});

/** Card-shaped subset served by the recipes.feed tRPC query. */
export const RecipeFeedItemSchema = RecipeModelSchema.pick({
  id: true,
  slug: true,
  title: true,
  imageUrl: true,
  prepTimeMinutes: true,
  cookTimeMinutes: true,
  servings: true,
  difficulty: true,
}).extend({
  category: RecipeFeedCategorySchema.nullable(),
  area: RecipeFeedAreaSchema.nullable(),
});
export type RecipeFeedItem = z.output<typeof RecipeFeedItemSchema>;

/**
 * Row shape served by `recipeCollection.getSaved` — the card-level recipe
 * plus the entry's `addedAt` timestamp so the UI can sort by save time.
 */
export const SavedRecipeRowSchema = z.object({
  recipe: RecipeFeedItemSchema,
  addedAt: z.date(),
});
export type SavedRecipeRow = z.output<typeof SavedRecipeRowSchema>;

export const RecipeFeedPageSchema = z.object({
  items: z.array(RecipeFeedItemSchema),
  nextCursor: z.string().nullable(),
});
export type RecipeFeedPage = z.output<typeof RecipeFeedPageSchema>;

export const RecipeMatchLevelSchema = z.enum(['A', 'B', 'C']);
export type RecipeMatchLevel = z.output<typeof RecipeMatchLevelSchema>;

const RecipeMatchInfoSchema = z.object({
  missingCount: z.number().int().min(0),
  totalIngredients: z.number().int().min(0),
  missingNames: z.array(z.string()),
});
export type RecipeMatchInfo = z.output<typeof RecipeMatchInfoSchema>;

export const RecipeMatchItemSchema = RecipeFeedItemSchema.extend({
  matchInfo: RecipeMatchInfoSchema,
});
export type RecipeMatchItem = z.output<typeof RecipeMatchItemSchema>;

export const RecipeMatchPageSchema = z.object({
  items: z.array(RecipeMatchItemSchema),
  nextCursor: z.string().nullable(),
  partialScan: z.boolean(),
});
export type RecipeMatchPage = z.output<typeof RecipeMatchPageSchema>;

const RecipeDetailIngredientCatalogSchema = IngredientCatalogModelSchema.pick({
  id: true,
  name: true,
  imageUrl: true,
  category: true,
});

const RecipeDetailIngredientSchema = RecipeIngredientModelSchema.pick({
  id: true,
  quantity: true,
  unit: true,
  notes: true,
}).extend({
  ingredient: RecipeDetailIngredientCatalogSchema,
});

const RecipeDetailTagSchema = RecipeTagModelSchema.pick({ tag: true });

/** Full recipe shape served by the recipes.byId tRPC query. */
export const RecipeDetailSchema = RecipeModelSchema.pick({
  id: true,
  externalId: true,
  slug: true,
  title: true,
  description: true,
  imageUrl: true,
  videoUrl: true,
  sourceUrl: true,
  status: true,
  servings: true,
  difficulty: true,
  prepTimeMinutes: true,
  cookTimeMinutes: true,
  categoryId: true,
  areaId: true,
  authorId: true,
  createdAt: true,
  updatedAt: true,
}).extend({
  category: RecipeFeedCategorySchema.nullable(),
  area: RecipeFeedAreaSchema.nullable(),
  ingredients: z.array(RecipeDetailIngredientSchema),
  tags: z.array(RecipeDetailTagSchema),
  steps: z.array(RecipeStepDetailSchema),
});
export type RecipeDetail = z.output<typeof RecipeDetailSchema>;
