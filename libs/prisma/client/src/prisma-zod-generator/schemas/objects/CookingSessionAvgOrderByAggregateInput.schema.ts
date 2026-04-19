import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';

const makeSchema = () =>
  z
    .object({
      servings: SortOrderSchema.optional(),
    })
    .strict();
export const CookingSessionAvgOrderByAggregateInputObjectSchema: z.ZodType<Prisma.CookingSessionAvgOrderByAggregateInput> =
  makeSchema() as unknown as z.ZodType<Prisma.CookingSessionAvgOrderByAggregateInput>;
export const CookingSessionAvgOrderByAggregateInputObjectZodSchema =
  makeSchema();
