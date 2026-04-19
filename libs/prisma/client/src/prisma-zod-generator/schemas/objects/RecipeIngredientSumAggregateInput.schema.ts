import * as z from 'zod';
import type { Prisma } from '@prisma/client';

const makeSchema = () =>
  z
    .object({
      quantity: z.literal(true).optional(),
    })
    .strict();
export const RecipeIngredientSumAggregateInputObjectSchema: z.ZodType<Prisma.RecipeIngredientSumAggregateInputType> =
  makeSchema() as unknown as z.ZodType<Prisma.RecipeIngredientSumAggregateInputType>;
export const RecipeIngredientSumAggregateInputObjectZodSchema = makeSchema();
