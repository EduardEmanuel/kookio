import * as z from 'zod';
import type { Prisma } from '@prisma/client';

const makeSchema = () =>
  z
    .object({
      id: z.literal(true).optional(),
      userId: z.literal(true).optional(),
      recipeId: z.literal(true).optional(),
      servings: z.literal(true).optional(),
      completedAt: z.literal(true).optional(),
      createdAt: z.literal(true).optional(),
      _all: z.literal(true).optional(),
    })
    .strict();
export const CookingSessionCountAggregateInputObjectSchema: z.ZodType<Prisma.CookingSessionCountAggregateInputType> =
  makeSchema() as unknown as z.ZodType<Prisma.CookingSessionCountAggregateInputType>;
export const CookingSessionCountAggregateInputObjectZodSchema = makeSchema();
