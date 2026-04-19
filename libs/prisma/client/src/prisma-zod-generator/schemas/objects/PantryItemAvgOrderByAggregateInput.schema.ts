import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';

const makeSchema = () =>
  z
    .object({
      quantity: SortOrderSchema.optional(),
    })
    .strict();
export const PantryItemAvgOrderByAggregateInputObjectSchema: z.ZodType<Prisma.PantryItemAvgOrderByAggregateInput> =
  makeSchema() as unknown as z.ZodType<Prisma.PantryItemAvgOrderByAggregateInput>;
export const PantryItemAvgOrderByAggregateInputObjectZodSchema = makeSchema();
