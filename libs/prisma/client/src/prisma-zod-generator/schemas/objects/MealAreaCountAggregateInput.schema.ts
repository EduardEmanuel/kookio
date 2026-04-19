import * as z from 'zod';
import type { Prisma } from '@prisma/client';

const makeSchema = () =>
  z
    .object({
      id: z.literal(true).optional(),
      externalId: z.literal(true).optional(),
      name: z.literal(true).optional(),
      flag: z.literal(true).optional(),
      createdAt: z.literal(true).optional(),
      _all: z.literal(true).optional(),
    })
    .strict();
export const MealAreaCountAggregateInputObjectSchema: z.ZodType<Prisma.MealAreaCountAggregateInputType> =
  makeSchema() as unknown as z.ZodType<Prisma.MealAreaCountAggregateInputType>;
export const MealAreaCountAggregateInputObjectZodSchema = makeSchema();
