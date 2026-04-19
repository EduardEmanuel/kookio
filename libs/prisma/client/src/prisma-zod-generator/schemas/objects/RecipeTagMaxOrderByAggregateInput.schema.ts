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
export const RecipeTagMaxOrderByAggregateInputObjectSchema: z.ZodType<Prisma.RecipeTagMaxOrderByAggregateInput> =
  makeSchema() as unknown as z.ZodType<Prisma.RecipeTagMaxOrderByAggregateInput>;
export const RecipeTagMaxOrderByAggregateInputObjectZodSchema = makeSchema();
