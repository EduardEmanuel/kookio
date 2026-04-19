import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RecipeStatusSchema } from '../enums/RecipeStatus.schema';
import { RecipeIngredientUncheckedCreateNestedManyWithoutRecipeInputObjectSchema as RecipeIngredientUncheckedCreateNestedManyWithoutRecipeInputObjectSchema } from './RecipeIngredientUncheckedCreateNestedManyWithoutRecipeInput.schema';
import { RecipeTagUncheckedCreateNestedManyWithoutRecipeInputObjectSchema as RecipeTagUncheckedCreateNestedManyWithoutRecipeInputObjectSchema } from './RecipeTagUncheckedCreateNestedManyWithoutRecipeInput.schema';
import { RecipeCollectionEntryUncheckedCreateNestedManyWithoutRecipeInputObjectSchema as RecipeCollectionEntryUncheckedCreateNestedManyWithoutRecipeInputObjectSchema } from './RecipeCollectionEntryUncheckedCreateNestedManyWithoutRecipeInput.schema';
import { MealPlanSlotUncheckedCreateNestedManyWithoutRecipeInputObjectSchema as MealPlanSlotUncheckedCreateNestedManyWithoutRecipeInputObjectSchema } from './MealPlanSlotUncheckedCreateNestedManyWithoutRecipeInput.schema';
import { CookingSessionUncheckedCreateNestedManyWithoutRecipeInputObjectSchema as CookingSessionUncheckedCreateNestedManyWithoutRecipeInputObjectSchema } from './CookingSessionUncheckedCreateNestedManyWithoutRecipeInput.schema';

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
      categoryId: z.string().optional().nullable(),
      areaId: z.string().optional().nullable(),
      authorId: z.string().optional().nullable(),
      createdAt: z.coerce.date().optional(),
      ingredients: z.lazy(
        () =>
          RecipeIngredientUncheckedCreateNestedManyWithoutRecipeInputObjectSchema,
      ),
      tags: z.lazy(
        () => RecipeTagUncheckedCreateNestedManyWithoutRecipeInputObjectSchema,
      ),
      collectionEntries: z.lazy(
        () =>
          RecipeCollectionEntryUncheckedCreateNestedManyWithoutRecipeInputObjectSchema,
      ),
      mealPlanSlots: z.lazy(
        () =>
          MealPlanSlotUncheckedCreateNestedManyWithoutRecipeInputObjectSchema,
      ),
      cookingSessions: z.lazy(
        () =>
          CookingSessionUncheckedCreateNestedManyWithoutRecipeInputObjectSchema,
      ),
    })
    .strict();
export const RecipeUncheckedCreateInputObjectSchema: z.ZodType<Prisma.RecipeUncheckedCreateInput> =
  makeSchema() as unknown as z.ZodType<Prisma.RecipeUncheckedCreateInput>;
export const RecipeUncheckedCreateInputObjectZodSchema = makeSchema();
