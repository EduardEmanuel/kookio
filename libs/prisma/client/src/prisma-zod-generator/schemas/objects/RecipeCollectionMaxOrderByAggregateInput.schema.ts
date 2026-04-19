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
export const RecipeCollectionMaxOrderByAggregateInputObjectSchema: z.ZodType<Prisma.RecipeCollectionMaxOrderByAggregateInput> =
  makeSchema() as unknown as z.ZodType<Prisma.RecipeCollectionMaxOrderByAggregateInput>;
export const RecipeCollectionMaxOrderByAggregateInputObjectZodSchema =
  makeSchema();
