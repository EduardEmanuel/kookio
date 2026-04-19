import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { RecipeTagCountOrderByAggregateInputObjectSchema as RecipeTagCountOrderByAggregateInputObjectSchema } from './RecipeTagCountOrderByAggregateInput.schema';
import { RecipeTagMaxOrderByAggregateInputObjectSchema as RecipeTagMaxOrderByAggregateInputObjectSchema } from './RecipeTagMaxOrderByAggregateInput.schema';
import { RecipeTagMinOrderByAggregateInputObjectSchema as RecipeTagMinOrderByAggregateInputObjectSchema } from './RecipeTagMinOrderByAggregateInput.schema';

const makeSchema = () =>
  z
    .object({
      id: SortOrderSchema.optional(),
      recipeId: SortOrderSchema.optional(),
      tag: SortOrderSchema.optional(),
      _count: z
        .lazy(() => RecipeTagCountOrderByAggregateInputObjectSchema)
        .optional(),
      _max: z
        .lazy(() => RecipeTagMaxOrderByAggregateInputObjectSchema)
        .optional(),
      _min: z
        .lazy(() => RecipeTagMinOrderByAggregateInputObjectSchema)
        .optional(),
    })
    .strict();
export const RecipeTagOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.RecipeTagOrderByWithAggregationInput> =
  makeSchema() as unknown as z.ZodType<Prisma.RecipeTagOrderByWithAggregationInput>;
export const RecipeTagOrderByWithAggregationInputObjectZodSchema = makeSchema();
