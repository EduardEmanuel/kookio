import * as z from 'zod';
import type { Prisma } from '@prisma/client';

const makeSchema = () =>
  z
    .object({
      quantity: z.literal(true).optional(),
    })
    .strict();
export const PantryItemAvgAggregateInputObjectSchema: z.ZodType<Prisma.PantryItemAvgAggregateInputType> =
  makeSchema() as unknown as z.ZodType<Prisma.PantryItemAvgAggregateInputType>;
export const PantryItemAvgAggregateInputObjectZodSchema = makeSchema();
