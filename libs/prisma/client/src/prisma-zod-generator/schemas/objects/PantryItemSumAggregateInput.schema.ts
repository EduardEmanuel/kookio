import * as z from 'zod';
import type { Prisma } from '@prisma/client';

const makeSchema = () =>
  z
    .object({
      quantity: z.literal(true).optional(),
    })
    .strict();
export const PantryItemSumAggregateInputObjectSchema: z.ZodType<Prisma.PantryItemSumAggregateInputType> =
  makeSchema() as unknown as z.ZodType<Prisma.PantryItemSumAggregateInputType>;
export const PantryItemSumAggregateInputObjectZodSchema = makeSchema();
