import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { PantryItemCountOrderByAggregateInputObjectSchema as PantryItemCountOrderByAggregateInputObjectSchema } from './PantryItemCountOrderByAggregateInput.schema';
import { PantryItemAvgOrderByAggregateInputObjectSchema as PantryItemAvgOrderByAggregateInputObjectSchema } from './PantryItemAvgOrderByAggregateInput.schema';
import { PantryItemMaxOrderByAggregateInputObjectSchema as PantryItemMaxOrderByAggregateInputObjectSchema } from './PantryItemMaxOrderByAggregateInput.schema';
import { PantryItemMinOrderByAggregateInputObjectSchema as PantryItemMinOrderByAggregateInputObjectSchema } from './PantryItemMinOrderByAggregateInput.schema';
import { PantryItemSumOrderByAggregateInputObjectSchema as PantryItemSumOrderByAggregateInputObjectSchema } from './PantryItemSumOrderByAggregateInput.schema';

const makeSchema = () =>
  z
    .object({
      id: SortOrderSchema.optional(),
      userId: SortOrderSchema.optional(),
      ingredientCatalogId: SortOrderSchema.optional(),
      quantity: SortOrderSchema.optional(),
      unit: SortOrderSchema.optional(),
      expiresAt: z
        .union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)])
        .optional(),
      addedAt: SortOrderSchema.optional(),
      updatedAt: SortOrderSchema.optional(),
      _count: z
        .lazy(() => PantryItemCountOrderByAggregateInputObjectSchema)
        .optional(),
      _avg: z
        .lazy(() => PantryItemAvgOrderByAggregateInputObjectSchema)
        .optional(),
      _max: z
        .lazy(() => PantryItemMaxOrderByAggregateInputObjectSchema)
        .optional(),
      _min: z
        .lazy(() => PantryItemMinOrderByAggregateInputObjectSchema)
        .optional(),
      _sum: z
        .lazy(() => PantryItemSumOrderByAggregateInputObjectSchema)
        .optional(),
    })
    .strict();
export const PantryItemOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.PantryItemOrderByWithAggregationInput> =
  makeSchema() as unknown as z.ZodType<Prisma.PantryItemOrderByWithAggregationInput>;
export const PantryItemOrderByWithAggregationInputObjectZodSchema =
  makeSchema();
