import * as z from 'zod';
import type { Prisma } from '@prisma/client';

const makeSchema = () =>
  z
    .object({
      servings: z.literal(true).optional(),
    })
    .strict();
export const CookingSessionAvgAggregateInputObjectSchema: z.ZodType<Prisma.CookingSessionAvgAggregateInputType> =
  makeSchema() as unknown as z.ZodType<Prisma.CookingSessionAvgAggregateInputType>;
export const CookingSessionAvgAggregateInputObjectZodSchema = makeSchema();
