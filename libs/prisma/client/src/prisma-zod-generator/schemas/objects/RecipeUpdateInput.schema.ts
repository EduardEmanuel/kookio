import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { NullableStringFieldUpdateOperationsInputObjectSchema as NullableStringFieldUpdateOperationsInputObjectSchema } from './NullableStringFieldUpdateOperationsInput.schema';
import { RecipeStatusSchema } from '../enums/RecipeStatus.schema';
import { EnumRecipeStatusFieldUpdateOperationsInputObjectSchema as EnumRecipeStatusFieldUpdateOperationsInputObjectSchema } from './EnumRecipeStatusFieldUpdateOperationsInput.schema';
import { IntFieldUpdateOperationsInputObjectSchema as IntFieldUpdateOperationsInputObjectSchema } from './IntFieldUpdateOperationsInput.schema';
import { NullableIntFieldUpdateOperationsInputObjectSchema as NullableIntFieldUpdateOperationsInputObjectSchema } from './NullableIntFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema as DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { MealCategoryUpdateOneWithoutRecipesNestedInputObjectSchema as MealCategoryUpdateOneWithoutRecipesNestedInputObjectSchema } from './MealCategoryUpdateOneWithoutRecipesNestedInput.schema';
import { MealAreaUpdateOneWithoutRecipesNestedInputObjectSchema as MealAreaUpdateOneWithoutRecipesNestedInputObjectSchema } from './MealAreaUpdateOneWithoutRecipesNestedInput.schema';
import { UserUpdateOneWithoutRecipesNestedInputObjectSchema as UserUpdateOneWithoutRecipesNestedInputObjectSchema } from './UserUpdateOneWithoutRecipesNestedInput.schema';
import { RecipeIngredientUpdateManyWithoutRecipeNestedInputObjectSchema as RecipeIngredientUpdateManyWithoutRecipeNestedInputObjectSchema } from './RecipeIngredientUpdateManyWithoutRecipeNestedInput.schema';
import { RecipeTagUpdateManyWithoutRecipeNestedInputObjectSchema as RecipeTagUpdateManyWithoutRecipeNestedInputObjectSchema } from './RecipeTagUpdateManyWithoutRecipeNestedInput.schema';
import { RecipeCollectionEntryUpdateManyWithoutRecipeNestedInputObjectSchema as RecipeCollectionEntryUpdateManyWithoutRecipeNestedInputObjectSchema } from './RecipeCollectionEntryUpdateManyWithoutRecipeNestedInput.schema';
import { MealPlanSlotUpdateManyWithoutRecipeNestedInputObjectSchema as MealPlanSlotUpdateManyWithoutRecipeNestedInputObjectSchema } from './MealPlanSlotUpdateManyWithoutRecipeNestedInput.schema';
import { CookingSessionUpdateManyWithoutRecipeNestedInputObjectSchema as CookingSessionUpdateManyWithoutRecipeNestedInputObjectSchema } from './CookingSessionUpdateManyWithoutRecipeNestedInput.schema';

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
      category: z
        .lazy(() => MealCategoryUpdateOneWithoutRecipesNestedInputObjectSchema)
        .optional(),
      area: z
        .lazy(() => MealAreaUpdateOneWithoutRecipesNestedInputObjectSchema)
        .optional(),
      author: z
        .lazy(() => UserUpdateOneWithoutRecipesNestedInputObjectSchema)
        .optional(),
      ingredients: z
        .lazy(
          () => RecipeIngredientUpdateManyWithoutRecipeNestedInputObjectSchema,
        )
        .optional(),
      tags: z
        .lazy(() => RecipeTagUpdateManyWithoutRecipeNestedInputObjectSchema)
        .optional(),
      collectionEntries: z
        .lazy(
          () =>
            RecipeCollectionEntryUpdateManyWithoutRecipeNestedInputObjectSchema,
        )
        .optional(),
      mealPlanSlots: z
        .lazy(() => MealPlanSlotUpdateManyWithoutRecipeNestedInputObjectSchema)
        .optional(),
      cookingSessions: z
        .lazy(
          () => CookingSessionUpdateManyWithoutRecipeNestedInputObjectSchema,
        )
        .optional(),
    })
    .strict();
export const RecipeUpdateInputObjectSchema: z.ZodType<Prisma.RecipeUpdateInput> =
  makeSchema() as unknown as z.ZodType<Prisma.RecipeUpdateInput>;
export const RecipeUpdateInputObjectZodSchema = makeSchema();
