import * as z from 'zod';
import type { Prisma } from '@prisma/client';

const makeSchema = () =>
  z
    .object({
      id: z.literal(true).optional(),
      recipeId: z.literal(true).optional(),
      tag: z.literal(true).optional(),
    })
    .strict();
export const RecipeTagMinAggregateInputObjectSchema: z.ZodType<Prisma.RecipeTagMinAggregateInputType> =
  makeSchema() as unknown as z.ZodType<Prisma.RecipeTagMinAggregateInputType>;
export const RecipeTagMinAggregateInputObjectZodSchema = makeSchema();
