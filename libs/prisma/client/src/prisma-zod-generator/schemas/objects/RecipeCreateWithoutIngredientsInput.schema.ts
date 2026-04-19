import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RecipeStatusSchema } from '../enums/RecipeStatus.schema';
import { MealCategoryCreateNestedOneWithoutRecipesInputObjectSchema as MealCategoryCreateNestedOneWithoutRecipesInputObjectSchema } from './MealCategoryCreateNestedOneWithoutRecipesInput.schema';
import { MealAreaCreateNestedOneWithoutRecipesInputObjectSchema as MealAreaCreateNestedOneWithoutRecipesInputObjectSchema } from './MealAreaCreateNestedOneWithoutRecipesInput.schema';
import { UserCreateNestedOneWithoutRecipesInputObjectSchema as UserCreateNestedOneWithoutRecipesInputObjectSchema } from './UserCreateNestedOneWithoutRecipesInput.schema';
import { RecipeTagCreateNestedManyWithoutRecipeInputObjectSchema as RecipeTagCreateNestedManyWithoutRecipeInputObjectSchema } from './RecipeTagCreateNestedManyWithoutRecipeInput.schema';
import { RecipeCollectionEntryCreateNestedManyWithoutRecipeInputObjectSchema as RecipeCollectionEntryCreateNestedManyWithoutRecipeInputObjectSchema } from './RecipeCollectionEntryCreateNestedManyWithoutRecipeInput.schema';
import { MealPlanSlotCreateNestedManyWithoutRecipeInputObjectSchema as MealPlanSlotCreateNestedManyWithoutRecipeInputObjectSchema } from './MealPlanSlotCreateNestedManyWithoutRecipeInput.schema';
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
      tags: z
        .lazy(() => RecipeTagCreateNestedManyWithoutRecipeInputObjectSchema)
        .optional(),
      collectionEntries: z
        .lazy(
          () =>
            RecipeCollectionEntryCreateNestedManyWithoutRecipeInputObjectSchema,
        )
        .optional(),
      mealPlanSlots: z
        .lazy(() => MealPlanSlotCreateNestedManyWithoutRecipeInputObjectSchema)
        .optional(),
      cookingSessions: z
        .lazy(
          () => CookingSessionCreateNestedManyWithoutRecipeInputObjectSchema,
        )
        .optional(),
    })
    .strict();
export const RecipeCreateWithoutIngredientsInputObjectSchema: z.ZodType<Prisma.RecipeCreateWithoutIngredientsInput> =
  makeSchema() as unknown as z.ZodType<Prisma.RecipeCreateWithoutIngredientsInput>;
export const RecipeCreateWithoutIngredientsInputObjectZodSchema = makeSchema();
