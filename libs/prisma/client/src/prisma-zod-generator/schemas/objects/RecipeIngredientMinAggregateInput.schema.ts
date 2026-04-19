import * as z from 'zod';
import type { Prisma } from '@prisma/client';

const makeSchema = () =>
  z
    .object({
      id: z.literal(true).optional(),
      recipeId: z.literal(true).optional(),
      ingredientCatalogId: z.literal(true).optional(),
      quantity: z.literal(true).optional(),
      unit: z.literal(true).optional(),
      notes: z.literal(true).optional(),
    })
    .strict();
export const RecipeIngredientMinAggregateInputObjectSchema: z.ZodType<Prisma.RecipeIngredientMinAggregateInputType> =
  makeSchema() as unknown as z.ZodType<Prisma.RecipeIngredientMinAggregateInputType>;
export const RecipeIngredientMinAggregateInputObjectZodSchema = makeSchema();
