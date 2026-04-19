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
export const RecipeTagCountOrderByAggregateInputObjectSchema: z.ZodType<Prisma.RecipeTagCountOrderByAggregateInput> =
  makeSchema() as unknown as z.ZodType<Prisma.RecipeTagCountOrderByAggregateInput>;
export const RecipeTagCountOrderByAggregateInputObjectZodSchema = makeSchema();
