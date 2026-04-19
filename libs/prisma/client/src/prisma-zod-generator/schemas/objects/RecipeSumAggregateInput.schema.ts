import * as z from 'zod';
import type { Prisma } from '@prisma/client';

const makeSchema = () =>
  z
    .object({
      servings: z.literal(true).optional(),
      prepTimeMinutes: z.literal(true).optional(),
      cookTimeMinutes: z.literal(true).optional(),
    })
    .strict();
export const RecipeSumAggregateInputObjectSchema: z.ZodType<Prisma.RecipeSumAggregateInputType> =
  makeSchema() as unknown as z.ZodType<Prisma.RecipeSumAggregateInputType>;
export const RecipeSumAggregateInputObjectZodSchema = makeSchema();
