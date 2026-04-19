import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { RecipeCollectionCountOrderByAggregateInputObjectSchema as RecipeCollectionCountOrderByAggregateInputObjectSchema } from './RecipeCollectionCountOrderByAggregateInput.schema';
import { RecipeCollectionMaxOrderByAggregateInputObjectSchema as RecipeCollectionMaxOrderByAggregateInputObjectSchema } from './RecipeCollectionMaxOrderByAggregateInput.schema';
import { RecipeCollectionMinOrderByAggregateInputObjectSchema as RecipeCollectionMinOrderByAggregateInputObjectSchema } from './RecipeCollectionMinOrderByAggregateInput.schema';

const makeSchema = () =>
  z
    .object({
      id: SortOrderSchema.optional(),
      userId: SortOrderSchema.optional(),
      name: SortOrderSchema.optional(),
      emoji: z
        .union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)])
        .optional(),
      createdAt: SortOrderSchema.optional(),
      updatedAt: SortOrderSchema.optional(),
      _count: z
        .lazy(() => RecipeCollectionCountOrderByAggregateInputObjectSchema)
        .optional(),
      _max: z
        .lazy(() => RecipeCollectionMaxOrderByAggregateInputObjectSchema)
        .optional(),
      _min: z
        .lazy(() => RecipeCollectionMinOrderByAggregateInputObjectSchema)
        .optional(),
    })
    .strict();
export const RecipeCollectionOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.RecipeCollectionOrderByWithAggregationInput> =
  makeSchema() as unknown as z.ZodType<Prisma.RecipeCollectionOrderByWithAggregationInput>;
export const RecipeCollectionOrderByWithAggregationInputObjectZodSchema =
  makeSchema();
