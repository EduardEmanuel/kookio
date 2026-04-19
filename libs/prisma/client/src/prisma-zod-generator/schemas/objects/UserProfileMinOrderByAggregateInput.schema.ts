import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';

const makeSchema = () =>
  z
    .object({
      id: SortOrderSchema.optional(),
      userId: SortOrderSchema.optional(),
      adultsCount: SortOrderSchema.optional(),
      childrenCount: SortOrderSchema.optional(),
      onboardingDone: SortOrderSchema.optional(),
      createdAt: SortOrderSchema.optional(),
      updatedAt: SortOrderSchema.optional(),
    })
    .strict();
export const UserProfileMinOrderByAggregateInputObjectSchema: z.ZodType<Prisma.UserProfileMinOrderByAggregateInput> =
  makeSchema() as unknown as z.ZodType<Prisma.UserProfileMinOrderByAggregateInput>;
export const UserProfileMinOrderByAggregateInputObjectZodSchema = makeSchema();
