import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { RecipeCollectionEntryCountOrderByAggregateInputObjectSchema as RecipeCollectionEntryCountOrderByAggregateInputObjectSchema } from './RecipeCollectionEntryCountOrderByAggregateInput.schema';
import { RecipeCollectionEntryMaxOrderByAggregateInputObjectSchema as RecipeCollectionEntryMaxOrderByAggregateInputObjectSchema } from './RecipeCollectionEntryMaxOrderByAggregateInput.schema';
import { RecipeCollectionEntryMinOrderByAggregateInputObjectSchema as RecipeCollectionEntryMinOrderByAggregateInputObjectSchema } from './RecipeCollectionEntryMinOrderByAggregateInput.schema';

const makeSchema = () =>
  z
    .object({
      collectionId: SortOrderSchema.optional(),
      recipeId: SortOrderSchema.optional(),
      addedAt: SortOrderSchema.optional(),
      _count: z
        .lazy(() => RecipeCollectionEntryCountOrderByAggregateInputObjectSchema)
        .optional(),
      _max: z
        .lazy(() => RecipeCollectionEntryMaxOrderByAggregateInputObjectSchema)
        .optional(),
      _min: z
        .lazy(() => RecipeCollectionEntryMinOrderByAggregateInputObjectSchema)
        .optional(),
    })
    .strict();
export const RecipeCollectionEntryOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.RecipeCollectionEntryOrderByWithAggregationInput> =
  makeSchema() as unknown as z.ZodType<Prisma.RecipeCollectionEntryOrderByWithAggregationInput>;
export const RecipeCollectionEntryOrderByWithAggregationInputObjectZodSchema =
  makeSchema();
