import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RecipeStatusSchema } from '../enums/RecipeStatus.schema';
import { MealCategoryCreateNestedOneWithoutRecipesInputObjectSchema as MealCategoryCreateNestedOneWithoutRecipesInputObjectSchema } from './MealCategoryCreateNestedOneWithoutRecipesInput.schema';
import { MealAreaCreateNestedOneWithoutRecipesInputObjectSchema as MealAreaCreateNestedOneWithoutRecipesInputObjectSchema } from './MealAreaCreateNestedOneWithoutRecipesInput.schema';
import { UserCreateNestedOneWithoutRecipesInputObjectSchema as UserCreateNestedOneWithoutRecipesInputObjectSchema } from './UserCreateNestedOneWithoutRecipesInput.schema';
import { RecipeIngredientCreateNestedManyWithoutRecipeInputObjectSchema as RecipeIngredientCreateNestedManyWithoutRecipeInputObjectSchema } from './RecipeIngredientCreateNestedManyWithoutRecipeInput.schema';
import { RecipeTagCreateNestedManyWithoutRecipeInputObjectSchema as RecipeTagCreateNestedManyWithoutRecipeInputObjectSchema } from './RecipeTagCreateNestedManyWithoutRecipeInput.schema';
import { RecipeCollectionEntryCreateNestedManyWithoutRecipeInputObjectSchema as RecipeCollectionEntryCreateNestedManyWithoutRecipeInputObjectSchema } from './RecipeCollectionEntryCreateNestedManyWithoutRecipeInput.schema';
import { CookingSessionCreateNestedManyWithoutRecipeInputObjectSchema as CookingSessionCreateNestedManyWithoutRecipeInputObjectSchema } from './CookingSessionCreateNestedManyWithoutRecipeInput.schema';

const makeSchema = () =>
  z
    .object({
      id: z.string().optional(),
      externalId: z.string().optional().nullable(),
      slug: z.string(),
      title: z.string(),
      description: z.string().optional().nullable(),
      imageUrl: z.string().optional().nullable(),
      youtubeUrl: z.string().optional().nullable(),
      sourceUrl: z.string().optional().nullable(),
      instructions: z.string(),
      status: RecipeStatusSchema.optional(),
      servings: z.number().int().optional(),
      prepTimeMinutes: z.number().int().optional().nullable(),
      cookTimeMinutes: z.number().int().optional().nullable(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
      category: z
        .lazy(() => MealCategoryCreateNestedOneWithoutRecipesInputObjectSchema)
        .optional(),
      area: z
        .lazy(() => MealAreaCreateNestedOneWithoutRecipesInputObjectSchema)
        .optional(),
      author: z
        .lazy(() => UserCreateNestedOneWithoutRecipesInputObjectSchema)
        .optional(),
      ingredients: z
        .lazy(
          () => RecipeIngredientCreateNestedManyWithoutRecipeInputObjectSchema,
        )
        .optional(),
      tags: z
        .lazy(() => RecipeTagCreateNestedManyWithoutRecipeInputObjectSchema)
        .optional(),
      collectionEntries: z
        .lazy(
          () =>
            RecipeCollectionEntryCreateNestedManyWithoutRecipeInputObjectSchema,
        )
        .optional(),
      cookingSessions: z
        .lazy(
          () => CookingSessionCreateNestedManyWithoutRecipeInputObjectSchema,
        )
        .optional(),
    })
    .strict();
export const RecipeCreateWithoutMealPlanSlotsInputObjectSchema: z.ZodType<Prisma.RecipeCreateWithoutMealPlanSlotsInput> =
  makeSchema() as unknown as z.ZodType<Prisma.RecipeCreateWithoutMealPlanSlotsInput>;
export const RecipeCreateWithoutMealPlanSlotsInputObjectZodSchema =
  makeSchema();
