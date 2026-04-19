import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';

const makeSchema = () =>
  z
    .object({
      collectionId: SortOrderSchema.optional(),
      recipeId: SortOrderSchema.optional(),
      addedAt: SortOrderSchema.optional(),
    })
    .strict();
export const RecipeCollectionEntryMinOrderByAggregateInputObjectSchema: z.ZodType<Prisma.RecipeCollectionEntryMinOrderByAggregateInput> =
  makeSchema() as unknown as z.ZodType<Prisma.RecipeCollectionEntryMinOrderByAggregateInput>;
export const RecipeCollectionEntryMinOrderByAggregateInputObjectZodSchema =
  makeSchema();
