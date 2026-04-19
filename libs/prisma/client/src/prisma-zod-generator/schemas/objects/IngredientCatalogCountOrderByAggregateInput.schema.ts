import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';

const makeSchema = () =>
  z
    .object({
      id: SortOrderSchema.optional(),
      externalId: SortOrderSchema.optional(),
      name: SortOrderSchema.optional(),
      normalizedName: SortOrderSchema.optional(),
      description: SortOrderSchema.optional(),
      imageUrl: SortOrderSchema.optional(),
      category: SortOrderSchema.optional(),
      createdAt: SortOrderSchema.optional(),
      updatedAt: SortOrderSchema.optional(),
    })
    .strict();
export const IngredientCatalogCountOrderByAggregateInputObjectSchema: z.ZodType<Prisma.IngredientCatalogCountOrderByAggregateInput> =
  makeSchema() as unknown as z.ZodType<Prisma.IngredientCatalogCountOrderByAggregateInput>;
export const IngredientCatalogCountOrderByAggregateInputObjectZodSchema =
  makeSchema();
