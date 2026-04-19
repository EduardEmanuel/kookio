import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';

const makeSchema = () =>
  z
    .object({
      adultsCount: SortOrderSchema.optional(),
      childrenCount: SortOrderSchema.optional(),
    })
    .strict();
export const UserProfileAvgOrderByAggregateInputObjectSchema: z.ZodType<Prisma.UserProfileAvgOrderByAggregateInput> =
  makeSchema() as unknown as z.ZodType<Prisma.UserProfileAvgOrderByAggregateInput>;
export const UserProfileAvgOrderByAggregateInputObjectZodSchema = makeSchema();
