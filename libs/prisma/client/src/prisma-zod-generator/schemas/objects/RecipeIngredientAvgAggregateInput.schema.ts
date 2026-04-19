import * as z from 'zod';
import type { Prisma } from '@prisma/client';

const makeSchema = () =>
  z
    .object({
      quantity: z.literal(true).optional(),
    })
    .strict();
export const RecipeIngredientAvgAggregateInputObjectSchema: z.ZodType<Prisma.RecipeIngredientAvgAggregateInputType> =
  makeSchema() as unknown as z.ZodType<Prisma.RecipeIngredientAvgAggregateInputType>;
export const RecipeIngredientAvgAggregateInputObjectZodSchema = makeSchema();
