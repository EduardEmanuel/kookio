import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';

const makeSchema = () =>
  z
    .object({
      servings: SortOrderSchema.optional(),
    })
    .strict();
export const CookingSessionSumOrderByAggregateInputObjectSchema: z.ZodType<Prisma.CookingSessionSumOrderByAggregateInput> =
  makeSchema() as unknown as z.ZodType<Prisma.CookingSessionSumOrderByAggregateInput>;
export const CookingSessionSumOrderByAggregateInputObjectZodSchema =
  makeSchema();
