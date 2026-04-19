import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';

const makeSchema = () =>
  z
    .object({
      id: SortOrderSchema.optional(),
      recipeId: SortOrderSchema.optional(),
      ingredientCatalogId: SortOrderSchema.optional(),
      quantity: SortOrderSchema.optional(),
      unit: SortOrderSchema.optional(),
      notes: SortOrderSchema.optional(),
    })
    .strict();
export const RecipeIngredientMinOrderByAggregateInputObjectSchema: z.ZodType<Prisma.RecipeIngredientMinOrderByAggregateInput> =
  makeSchema() as unknown as z.ZodType<Prisma.RecipeIngredientMinOrderByAggregateInput>;
export const RecipeIngredientMinOrderByAggregateInputObjectZodSchema =
  makeSchema();
