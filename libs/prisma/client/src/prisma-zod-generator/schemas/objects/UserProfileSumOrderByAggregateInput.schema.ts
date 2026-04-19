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
export const UserProfileSumOrderByAggregateInputObjectSchema: z.ZodType<Prisma.UserProfileSumOrderByAggregateInput> =
  makeSchema() as unknown as z.ZodType<Prisma.UserProfileSumOrderByAggregateInput>;
export const UserProfileSumOrderByAggregateInputObjectZodSchema = makeSchema();
