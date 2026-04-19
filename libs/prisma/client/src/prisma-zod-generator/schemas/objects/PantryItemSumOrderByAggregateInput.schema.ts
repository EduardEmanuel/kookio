import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';

const makeSchema = () =>
  z
    .object({
      quantity: SortOrderSchema.optional(),
    })
    .strict();
export const PantryItemSumOrderByAggregateInputObjectSchema: z.ZodType<Prisma.PantryItemSumOrderByAggregateInput> =
  makeSchema() as unknown as z.ZodType<Prisma.PantryItemSumOrderByAggregateInput>;
export const PantryItemSumOrderByAggregateInputObjectZodSchema = makeSchema();
