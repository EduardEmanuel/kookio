import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';

const makeSchema = () =>
  z
    .object({
      id: SortOrderSchema.optional(),
      recipeId: SortOrderSchema.optional(),
      tag: SortOrderSchema.optional(),
    })
    .strict();
export const RecipeTagMinOrderByAggregateInputObjectSchema: z.ZodType<Prisma.RecipeTagMinOrderByAggregateInput> =
  makeSchema() as unknown as z.ZodType<Prisma.RecipeTagMinOrderByAggregateInput>;
export const RecipeTagMinOrderByAggregateInputObjectZodSchema = makeSchema();
