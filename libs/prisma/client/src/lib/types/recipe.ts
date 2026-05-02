import z from 'zod';

import {
  IngredientCatalogModelSchema,
  MealAreaModelSchema,
  MealCategoryModelSchema,
  RecipeIngredientModelSchema,
  RecipeInputSchema,
  RecipeModelSchema,
  RecipeTagModelSchema,
} from '../../prisma-zod-generator/schemas/index';

import { RecipeIngredientSeedRowSchema } from './recipe-ingredient';
import { RecipeTagSeedRowSchema } from './recipe-tag';

export const RecipeSeedRowSchema = RecipeInputSchema.pick({
  externalId: true,
  slug: true,
  title: true,
  imageUrl: true,
  youtubeUrl: true,
  sourceUrl: true,
  instructions: true,
}).extend({
  categoryExternalId: z.string().nullable(),
  areaExternalId: z.string().nullable(),
  tags: z.array(RecipeTagSeedRowSchema),
  ingredients: z.array(RecipeIngredientSeedRowSchema),
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
}).extend({
  category: RecipeFeedCategorySchema.nullable(),
  area: RecipeFeedAreaSchema.nullable(),
});
export type RecipeFeedItem = z.output<typeof RecipeFeedItemSchema>;

export const RecipeFeedPageSchema = z.object({
  items: z.array(RecipeFeedItemSchema),
  nextCursor: z.string().nullable(),
});
export type RecipeFeedPage = z.output<typeof RecipeFeedPageSchema>;

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
  youtubeUrl: true,
  sourceUrl: true,
  instructions: true,
  status: true,
  servings: true,
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
});
export type RecipeDetail = z.output<typeof RecipeDetailSchema>;
