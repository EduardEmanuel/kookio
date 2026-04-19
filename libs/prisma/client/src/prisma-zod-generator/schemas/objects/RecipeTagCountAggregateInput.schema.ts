import * as z from 'zod';
import type { Prisma } from '@prisma/client';

const makeSchema = () =>
  z
    .object({
      id: z.literal(true).optional(),
      recipeId: z.literal(true).optional(),
      tag: z.literal(true).optional(),
      _all: z.literal(true).optional(),
    })
    .strict();
export const RecipeTagCountAggregateInputObjectSchema: z.ZodType<Prisma.RecipeTagCountAggregateInputType> =
  makeSchema() as unknown as z.ZodType<Prisma.RecipeTagCountAggregateInputType>;
export const RecipeTagCountAggregateInputObjectZodSchema = makeSchema();
