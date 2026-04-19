import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';

const makeSchema = () =>
  z
    .object({
      _count: SortOrderSchema.optional(),
    })
    .strict();
export const CookingSessionOrderByRelationAggregateInputObjectSchema: z.ZodType<Prisma.CookingSessionOrderByRelationAggregateInput> =
  makeSchema() as unknown as z.ZodType<Prisma.CookingSessionOrderByRelationAggregateInput>;
export const CookingSessionOrderByRelationAggregateInputObjectZodSchema =
  makeSchema();
