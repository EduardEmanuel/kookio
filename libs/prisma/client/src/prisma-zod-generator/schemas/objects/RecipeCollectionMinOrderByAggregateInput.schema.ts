import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';

const makeSchema = () =>
  z
    .object({
      id: SortOrderSchema.optional(),
      userId: SortOrderSchema.optional(),
      name: SortOrderSchema.optional(),
      emoji: SortOrderSchema.optional(),
      createdAt: SortOrderSchema.optional(),
      updatedAt: SortOrderSchema.optional(),
    })
    .strict();
export const RecipeCollectionMinOrderByAggregateInputObjectSchema: z.ZodType<Prisma.RecipeCollectionMinOrderByAggregateInput> =
  makeSchema() as unknown as z.ZodType<Prisma.RecipeCollectionMinOrderByAggregateInput>;
export const RecipeCollectionMinOrderByAggregateInputObjectZodSchema =
  makeSchema();
