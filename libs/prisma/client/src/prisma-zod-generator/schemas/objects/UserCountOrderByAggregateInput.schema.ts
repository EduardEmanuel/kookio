import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';

const makeSchema = () =>
  z
    .object({
      id: SortOrderSchema.optional(),
      email: SortOrderSchema.optional(),
      firebaseUid: SortOrderSchema.optional(),
      name: SortOrderSchema.optional(),
      roles: SortOrderSchema.optional(),
      amr: SortOrderSchema.optional(),
      isDisabled: SortOrderSchema.optional(),
      deletedAt: SortOrderSchema.optional(),
      createdAt: SortOrderSchema.optional(),
      updatedAt: SortOrderSchema.optional(),
    })
    .strict();
export const UserCountOrderByAggregateInputObjectSchema: z.ZodType<Prisma.UserCountOrderByAggregateInput> =
  makeSchema() as unknown as z.ZodType<Prisma.UserCountOrderByAggregateInput>;
export const UserCountOrderByAggregateInputObjectZodSchema = makeSchema();
