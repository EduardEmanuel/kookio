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
export const RecipeTagMaxAggregateInputObjectSchema: z.ZodType<Prisma.RecipeTagMaxAggregateInputType> =
  makeSchema() as unknown as z.ZodType<Prisma.RecipeTagMaxAggregateInputType>;
export const RecipeTagMaxAggregateInputObjectZodSchema = makeSchema();
