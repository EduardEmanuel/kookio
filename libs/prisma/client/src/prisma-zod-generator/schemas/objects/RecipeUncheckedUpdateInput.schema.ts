import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { NullableStringFieldUpdateOperationsInputObjectSchema as NullableStringFieldUpdateOperationsInputObjectSchema } from './NullableStringFieldUpdateOperationsInput.schema';
import { RecipeStatusSchema } from '../enums/RecipeStatus.schema';
import { EnumRecipeStatusFieldUpdateOperationsInputObjectSchema as EnumRecipeStatusFieldUpdateOperationsInputObjectSchema } from './EnumRecipeStatusFieldUpdateOperationsInput.schema';
import { IntFieldUpdateOperationsInputObjectSchema as IntFieldUpdateOperationsInputObjectSchema } from './IntFieldUpdateOperationsInput.schema';
import { NullableIntFieldUpdateOperationsInputObjectSchema as NullableIntFieldUpdateOperationsInputObjectSchema } from './NullableIntFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema as DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { RecipeIngredientUncheckedUpdateManyWithoutRecipeNestedInputObjectSchema as RecipeIngredientUncheckedUpdateManyWithoutRecipeNestedInputObjectSchema } from './RecipeIngredientUncheckedUpdateManyWithoutRecipeNestedInput.schema';
import { RecipeTagUncheckedUpdateManyWithoutRecipeNestedInputObjectSchema as RecipeTagUncheckedUpdateManyWithoutRecipeNestedInputObjectSchema } from './RecipeTagUncheckedUpdateManyWithoutRecipeNestedInput.schema';
import { RecipeCollectionEntryUncheckedUpdateManyWithoutRecipeNestedInputObjectSchema as RecipeCollectionEntryUncheckedUpdateManyWithoutRecipeNestedInputObjectSchema } from './RecipeCollectionEntryUncheckedUpdateManyWithoutRecipeNestedInput.schema';
import { MealPlanSlotUncheckedUpdateManyWithoutRecipeNestedInputObjectSchema as MealPlanSlotUncheckedUpdateManyWithoutRecipeNestedInputObjectSchema } from './MealPlanSlotUncheckedUpdateManyWithoutRecipeNestedInput.schema';
import { CookingSessionUncheckedUpdateManyWithoutRecipeNestedInputObjectSchema as CookingSessionUncheckedUpdateManyWithoutRecipeNestedInputObjectSchema } from './CookingSessionUncheckedUpdateManyWithoutRecipeNestedInput.schema';

const makeSchema = () =>
  z
    .object({
      id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
      externalId: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema),
        ])
        .optional()
        .nullable(),
      slug: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
      title: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
      description: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema),
        ])
        .optional()
        .nullable(),
      imageUrl: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema),
        ])
        .optional()
        .nullable(),
      youtubeUrl: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema),
        ])
        .optional()
        .nullable(),
      sourceUrl: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema),
        ])
        .optional()
        .nullable(),
      instructions: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
      status: z
        .union([
          RecipeStatusSchema,
          z.lazy(() => EnumRecipeStatusFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
      servings: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
      prepTimeMinutes: z
        .union([
          z.number().int(),
          z.lazy(() => NullableIntFieldUpdateOperationsInputObjectSchema),
        ])
        .optional()
        .nullable(),
      cookTimeMinutes: z
        .union([
          z.number().int(),
          z.lazy(() => NullableIntFieldUpdateOperationsInputObjectSchema),
        ])
        .optional()
        .nullable(),
      categoryId: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema),
        ])
        .optional()
        .nullable(),
      areaId: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema),
        ])
        .optional()
        .nullable(),
      authorId: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema),
        ])
        .optional()
        .nullable(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
      ingredients: z
        .lazy(
          () =>
            RecipeIngredientUncheckedUpdateManyWithoutRecipeNestedInputObjectSchema,
        )
        .optional(),
      tags: z
        .lazy(
          () =>
            RecipeTagUncheckedUpdateManyWithoutRecipeNestedInputObjectSchema,
        )
        .optional(),
      collectionEntries: z
        .lazy(
          () =>
            RecipeCollectionEntryUncheckedUpdateManyWithoutRecipeNestedInputObjectSchema,
        )
        .optional(),
      mealPlanSlots: z
        .lazy(
          () =>
            MealPlanSlotUncheckedUpdateManyWithoutRecipeNestedInputObjectSchema,
        )
        .optional(),
      cookingSessions: z
        .lazy(
          () =>
            CookingSessionUncheckedUpdateManyWithoutRecipeNestedInputObjectSchema,
        )
        .optional(),
    })
    .strict();
export const RecipeUncheckedUpdateInputObjectSchema: z.ZodType<Prisma.RecipeUncheckedUpdateInput> =
  makeSchema() as unknown as z.ZodType<Prisma.RecipeUncheckedUpdateInput>;
export const RecipeUncheckedUpdateInputObjectZodSchema = makeSchema();
