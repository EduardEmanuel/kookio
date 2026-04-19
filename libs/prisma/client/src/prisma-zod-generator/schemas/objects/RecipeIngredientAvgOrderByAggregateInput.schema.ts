import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';

const makeSchema = () =>
  z
    .object({
      quantity: SortOrderSchema.optional(),
    })
    .strict();
export const RecipeIngredientAvgOrderByAggregateInputObjectSchema: z.ZodType<Prisma.RecipeIngredientAvgOrderByAggregateInput> =
  makeSchema() as unknown as z.ZodType<Prisma.RecipeIngredientAvgOrderByAggregateInput>;
export const RecipeIngredientAvgOrderByAggregateInputObjectZodSchema =
  makeSchema();
