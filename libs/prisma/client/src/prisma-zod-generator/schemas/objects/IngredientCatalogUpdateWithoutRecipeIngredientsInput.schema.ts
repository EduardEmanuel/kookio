import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { NullableStringFieldUpdateOperationsInputObjectSchema as NullableStringFieldUpdateOperationsInputObjectSchema } from './NullableStringFieldUpdateOperationsInput.schema';
import { IngredientCategorySchema } from '../enums/IngredientCategory.schema';
import { NullableEnumIngredientCategoryFieldUpdateOperationsInputObjectSchema as NullableEnumIngredientCategoryFieldUpdateOperationsInputObjectSchema } from './NullableEnumIngredientCategoryFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema as DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { PantryItemUpdateManyWithoutIngredientNestedInputObjectSchema as PantryItemUpdateManyWithoutIngredientNestedInputObjectSchema } from './PantryItemUpdateManyWithoutIngredientNestedInput.schema';

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
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
      normalizedName: z
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
      category: z
        .union([
          IngredientCategorySchema,
          z.lazy(
            () =>
              NullableEnumIngredientCategoryFieldUpdateOperationsInputObjectSchema,
          ),
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
      pantryItems: z
        .lazy(
          () => PantryItemUpdateManyWithoutIngredientNestedInputObjectSchema,
        )
        .optional(),
    })
    .strict();
export const IngredientCatalogUpdateWithoutRecipeIngredientsInputObjectSchema: z.ZodType<Prisma.IngredientCatalogUpdateWithoutRecipeIngredientsInput> =
  makeSchema() as unknown as z.ZodType<Prisma.IngredientCatalogUpdateWithoutRecipeIngredientsInput>;
export const IngredientCatalogUpdateWithoutRecipeIngredientsInputObjectZodSchema =
  makeSchema();
