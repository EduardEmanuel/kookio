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
export const RecipeIngredientMaxAggregateInputObjectSchema: z.ZodType<Prisma.RecipeIngredientMaxAggregateInputType> =
  makeSchema() as unknown as z.ZodType<Prisma.RecipeIngredientMaxAggregateInputType>;
export const RecipeIngredientMaxAggregateInputObjectZodSchema = makeSchema();
