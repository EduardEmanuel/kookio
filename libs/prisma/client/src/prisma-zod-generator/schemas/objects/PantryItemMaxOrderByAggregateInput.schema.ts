import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';

const makeSchema = () =>
  z
    .object({
      id: SortOrderSchema.optional(),
      userId: SortOrderSchema.optional(),
      ingredientCatalogId: SortOrderSchema.optional(),
      quantity: SortOrderSchema.optional(),
      unit: SortOrderSchema.optional(),
      expiresAt: SortOrderSchema.optional(),
      addedAt: SortOrderSchema.optional(),
      updatedAt: SortOrderSchema.optional(),
    })
    .strict();
export const PantryItemMaxOrderByAggregateInputObjectSchema: z.ZodType<Prisma.PantryItemMaxOrderByAggregateInput> =
  makeSchema() as unknown as z.ZodType<Prisma.PantryItemMaxOrderByAggregateInput>;
export const PantryItemMaxOrderByAggregateInputObjectZodSchema = makeSchema();
