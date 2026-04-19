import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';

const makeSchema = () =>
  z
    .object({
      quantity: SortOrderSchema.optional(),
    })
    .strict();
export const RecipeIngredientSumOrderByAggregateInputObjectSchema: z.ZodType<Prisma.RecipeIngredientSumOrderByAggregateInput> =
  makeSchema() as unknown as z.ZodType<Prisma.RecipeIngredientSumOrderByAggregateInput>;
export const RecipeIngredientSumOrderByAggregateInputObjectZodSchema =
  makeSchema();
