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
export const RecipeIngredientCountOrderByAggregateInputObjectSchema: z.ZodType<Prisma.RecipeIngredientCountOrderByAggregateInput> =
  makeSchema() as unknown as z.ZodType<Prisma.RecipeIngredientCountOrderByAggregateInput>;
export const RecipeIngredientCountOrderByAggregateInputObjectZodSchema =
  makeSchema();
