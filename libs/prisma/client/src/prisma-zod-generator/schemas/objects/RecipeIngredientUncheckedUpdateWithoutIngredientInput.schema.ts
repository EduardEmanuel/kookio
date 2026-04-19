import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { NullableFloatFieldUpdateOperationsInputObjectSchema as NullableFloatFieldUpdateOperationsInputObjectSchema } from './NullableFloatFieldUpdateOperationsInput.schema';
import { MeasureUnitSchema } from '../enums/MeasureUnit.schema';
import { NullableEnumMeasureUnitFieldUpdateOperationsInputObjectSchema as NullableEnumMeasureUnitFieldUpdateOperationsInputObjectSchema } from './NullableEnumMeasureUnitFieldUpdateOperationsInput.schema';
import { NullableStringFieldUpdateOperationsInputObjectSchema as NullableStringFieldUpdateOperationsInputObjectSchema } from './NullableStringFieldUpdateOperationsInput.schema';

const makeSchema = () =>
  z
    .object({
      id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
      recipeId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
      quantity: z
        .union([
          z.number(),
          z.lazy(() => NullableFloatFieldUpdateOperationsInputObjectSchema),
        ])
        .optional()
        .nullable(),
      unit: z
        .union([
          MeasureUnitSchema,
          z.lazy(
            () => NullableEnumMeasureUnitFieldUpdateOperationsInputObjectSchema,
          ),
        ])
        .optional()
        .nullable(),
      notes: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema),
        ])
        .optional()
        .nullable(),
    })
    .strict();
export const RecipeIngredientUncheckedUpdateWithoutIngredientInputObjectSchema: z.ZodType<Prisma.RecipeIngredientUncheckedUpdateWithoutIngredientInput> =
  makeSchema() as unknown as z.ZodType<Prisma.RecipeIngredientUncheckedUpdateWithoutIngredientInput>;
export const RecipeIngredientUncheckedUpdateWithoutIngredientInputObjectZodSchema =
  makeSchema();
