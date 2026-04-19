import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';

const makeSchema = () =>
  z
    .object({
      servings: SortOrderSchema.optional(),
      prepTimeMinutes: SortOrderSchema.optional(),
      cookTimeMinutes: SortOrderSchema.optional(),
    })
    .strict();
export const RecipeAvgOrderByAggregateInputObjectSchema: z.ZodType<Prisma.RecipeAvgOrderByAggregateInput> =
  makeSchema() as unknown as z.ZodType<Prisma.RecipeAvgOrderByAggregateInput>;
export const RecipeAvgOrderByAggregateInputObjectZodSchema = makeSchema();
