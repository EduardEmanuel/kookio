import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { RecipeCountOrderByAggregateInputObjectSchema as RecipeCountOrderByAggregateInputObjectSchema } from './RecipeCountOrderByAggregateInput.schema';
import { RecipeAvgOrderByAggregateInputObjectSchema as RecipeAvgOrderByAggregateInputObjectSchema } from './RecipeAvgOrderByAggregateInput.schema';
import { RecipeMaxOrderByAggregateInputObjectSchema as RecipeMaxOrderByAggregateInputObjectSchema } from './RecipeMaxOrderByAggregateInput.schema';
import { RecipeMinOrderByAggregateInputObjectSchema as RecipeMinOrderByAggregateInputObjectSchema } from './RecipeMinOrderByAggregateInput.schema';
import { RecipeSumOrderByAggregateInputObjectSchema as RecipeSumOrderByAggregateInputObjectSchema } from './RecipeSumOrderByAggregateInput.schema';

const makeSchema = () =>
  z
    .object({
      id: SortOrderSchema.optional(),
      externalId: z
        .union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)])
        .optional(),
      slug: SortOrderSchema.optional(),
      title: SortOrderSchema.optional(),
      description: z
        .union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)])
        .optional(),
      imageUrl: z
        .union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)])
        .optional(),
      youtubeUrl: z
        .union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)])
        .optional(),
      sourceUrl: z
        .union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)])
        .optional(),
      instructions: SortOrderSchema.optional(),
      status: SortOrderSchema.optional(),
      servings: SortOrderSchema.optional(),
      prepTimeMinutes: z
        .union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)])
        .optional(),
      cookTimeMinutes: z
        .union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)])
        .optional(),
      categoryId: z
        .union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)])
        .optional(),
      areaId: z
        .union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)])
        .optional(),
      authorId: z
        .union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)])
        .optional(),
      createdAt: SortOrderSchema.optional(),
      updatedAt: SortOrderSchema.optional(),
      _count: z
        .lazy(() => RecipeCountOrderByAggregateInputObjectSchema)
        .optional(),
      _avg: z.lazy(() => RecipeAvgOrderByAggregateInputObjectSchema).optional(),
      _max: z.lazy(() => RecipeMaxOrderByAggregateInputObjectSchema).optional(),
      _min: z.lazy(() => RecipeMinOrderByAggregateInputObjectSchema).optional(),
      _sum: z.lazy(() => RecipeSumOrderByAggregateInputObjectSchema).optional(),
    })
    .strict();
export const RecipeOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.RecipeOrderByWithAggregationInput> =
  makeSchema() as unknown as z.ZodType<Prisma.RecipeOrderByWithAggregationInput>;
export const RecipeOrderByWithAggregationInputObjectZodSchema = makeSchema();
