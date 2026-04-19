import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';

const makeSchema = () =>
  z
    .object({
      _count: SortOrderSchema.optional(),
    })
    .strict();
export const PantryItemOrderByRelationAggregateInputObjectSchema: z.ZodType<Prisma.PantryItemOrderByRelationAggregateInput> =
  makeSchema() as unknown as z.ZodType<Prisma.PantryItemOrderByRelationAggregateInput>;
export const PantryItemOrderByRelationAggregateInputObjectZodSchema =
  makeSchema();
