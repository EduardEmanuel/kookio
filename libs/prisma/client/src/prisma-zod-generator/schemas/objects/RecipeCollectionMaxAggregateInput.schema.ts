import * as z from 'zod';
import type { Prisma } from '@prisma/client';

const makeSchema = () =>
  z
    .object({
      id: z.literal(true).optional(),
      userId: z.literal(true).optional(),
      name: z.literal(true).optional(),
      emoji: z.literal(true).optional(),
      createdAt: z.literal(true).optional(),
      updatedAt: z.literal(true).optional(),
    })
    .strict();
export const RecipeCollectionMaxAggregateInputObjectSchema: z.ZodType<Prisma.RecipeCollectionMaxAggregateInputType> =
  makeSchema() as unknown as z.ZodType<Prisma.RecipeCollectionMaxAggregateInputType>;
export const RecipeCollectionMaxAggregateInputObjectZodSchema = makeSchema();
