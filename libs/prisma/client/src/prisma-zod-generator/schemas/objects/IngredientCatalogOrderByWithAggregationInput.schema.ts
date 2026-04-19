import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { IngredientCatalogCountOrderByAggregateInputObjectSchema as IngredientCatalogCountOrderByAggregateInputObjectSchema } from './IngredientCatalogCountOrderByAggregateInput.schema';
import { IngredientCatalogMaxOrderByAggregateInputObjectSchema as IngredientCatalogMaxOrderByAggregateInputObjectSchema } from './IngredientCatalogMaxOrderByAggregateInput.schema';
import { IngredientCatalogMinOrderByAggregateInputObjectSchema as IngredientCatalogMinOrderByAggregateInputObjectSchema } from './IngredientCatalogMinOrderByAggregateInput.schema';

const makeSchema = () =>
  z
    .object({
      id: SortOrderSchema.optional(),
      externalId: z
        .union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)])
        .optional(),
      name: SortOrderSchema.optional(),
      normalizedName: SortOrderSchema.optional(),
      description: z
        .union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)])
        .optional(),
      imageUrl: z
        .union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)])
        .optional(),
      category: z
        .union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)])
        .optional(),
      createdAt: SortOrderSchema.optional(),
      updatedAt: SortOrderSchema.optional(),
      _count: z
        .lazy(() => IngredientCatalogCountOrderByAggregateInputObjectSchema)
        .optional(),
      _max: z
        .lazy(() => IngredientCatalogMaxOrderByAggregateInputObjectSchema)
        .optional(),
      _min: z
        .lazy(() => IngredientCatalogMinOrderByAggregateInputObjectSchema)
        .optional(),
    })
    .strict();
export const IngredientCatalogOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.IngredientCatalogOrderByWithAggregationInput> =
  makeSchema() as unknown as z.ZodType<Prisma.IngredientCatalogOrderByWithAggregationInput>;
export const IngredientCatalogOrderByWithAggregationInputObjectZodSchema =
  makeSchema();
