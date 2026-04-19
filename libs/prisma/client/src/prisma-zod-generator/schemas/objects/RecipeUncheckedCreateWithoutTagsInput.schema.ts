import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RecipeStatusSchema } from '../enums/RecipeStatus.schema';
import { RecipeIngredientUncheckedCreateNestedManyWithoutRecipeInputObjectSchema as RecipeIngredientUncheckedCreateNestedManyWithoutRecipeInputObjectSchema } from './RecipeIngredientUncheckedCreateNestedManyWithoutRecipeInput.schema';
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
      updatedAt: z.coerce.date().optional(),
      ingredients: z
        .lazy(
          () =>
            RecipeIngredientUncheckedCreateNestedManyWithoutRecipeInputObjectSchema,
        )
        .optional(),
      collectionEntries: z
        .lazy(
          () =>
            RecipeCollectionEntryUncheckedCreateNestedManyWithoutRecipeInputObjectSchema,
        )
        .optional(),
      mealPlanSlots: z
        .lazy(
          () =>
            MealPlanSlotUncheckedCreateNestedManyWithoutRecipeInputObjectSchema,
        )
        .optional(),
      cookingSessions: z
        .lazy(
          () =>
            CookingSessionUncheckedCreateNestedManyWithoutRecipeInputObjectSchema,
        )
        .optional(),
    })
    .strict();
export const RecipeUncheckedCreateWithoutTagsInputObjectSchema: z.ZodType<Prisma.RecipeUncheckedCreateWithoutTagsInput> =
  makeSchema() as unknown as z.ZodType<Prisma.RecipeUncheckedCreateWithoutTagsInput>;
export const RecipeUncheckedCreateWithoutTagsInputObjectZodSchema =
  makeSchema();
