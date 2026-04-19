import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { IngredientCategorySchema } from '../enums/IngredientCategory.schema';

const makeSchema = () =>
  z
    .object({
      set: IngredientCategorySchema.optional(),
    })
    .strict();
export const NullableEnumIngredientCategoryFieldUpdateOperationsInputObjectSchema: z.ZodType<Prisma.NullableEnumIngredientCategoryFieldUpdateOperationsInput> =
  makeSchema() as unknown as z.ZodType<Prisma.NullableEnumIngredientCategoryFieldUpdateOperationsInput>;
export const NullableEnumIngredientCategoryFieldUpdateOperationsInputObjectZodSchema =
  makeSchema();
