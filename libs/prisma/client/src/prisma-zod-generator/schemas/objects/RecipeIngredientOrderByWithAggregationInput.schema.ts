import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { RecipeIngredientCountOrderByAggregateInputObjectSchema as RecipeIngredientCountOrderByAggregateInputObjectSchema } from './RecipeIngredientCountOrderByAggregateInput.schema';
import { RecipeIngredientAvgOrderByAggregateInputObjectSchema as RecipeIngredientAvgOrderByAggregateInputObjectSchema } from './RecipeIngredientAvgOrderByAggregateInput.schema';
import { RecipeIngredientMaxOrderByAggregateInputObjectSchema as RecipeIngredientMaxOrderByAggregateInputObjectSchema } from './RecipeIngredientMaxOrderByAggregateInput.schema';
import { RecipeIngredientMinOrderByAggregateInputObjectSchema as RecipeIngredientMinOrderByAggregateInputObjectSchema } from './RecipeIngredientMinOrderByAggregateInput.schema';
import { RecipeIngredientSumOrderByAggregateInputObjectSchema as RecipeIngredientSumOrderByAggregateInputObjectSchema } from './RecipeIngredientSumOrderByAggregateInput.schema';

const makeSchema = () =>
  z
    .object({
      id: SortOrderSchema.optional(),
      recipeId: SortOrderSchema.optional(),
      ingredientCatalogId: SortOrderSchema.optional(),
      quantity: z
        .union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)])
        .optional(),
      unit: z
        .union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)])
        .optional(),
      notes: z
        .union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)])
        .optional(),
      _count: z
        .lazy(() => RecipeIngredientCountOrderByAggregateInputObjectSchema)
        .optional(),
      _avg: z
        .lazy(() => RecipeIngredientAvgOrderByAggregateInputObjectSchema)
        .optional(),
      _max: z
        .lazy(() => RecipeIngredientMaxOrderByAggregateInputObjectSchema)
        .optional(),
      _min: z
        .lazy(() => RecipeIngredientMinOrderByAggregateInputObjectSchema)
        .optional(),
      _sum: z
        .lazy(() => RecipeIngredientSumOrderByAggregateInputObjectSchema)
        .optional(),
    })
    .strict();
export const RecipeIngredientOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.RecipeIngredientOrderByWithAggregationInput> =
  makeSchema() as unknown as z.ZodType<Prisma.RecipeIngredientOrderByWithAggregationInput>;
export const RecipeIngredientOrderByWithAggregationInputObjectZodSchema =
  makeSchema();
