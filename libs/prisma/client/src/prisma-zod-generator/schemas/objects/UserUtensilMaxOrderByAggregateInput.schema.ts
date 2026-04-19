import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';

const makeSchema = () =>
  z
    .object({
      userId: SortOrderSchema.optional(),
      utensilId: SortOrderSchema.optional(),
    })
    .strict();
export const UserUtensilMaxOrderByAggregateInputObjectSchema: z.ZodType<Prisma.UserUtensilMaxOrderByAggregateInput> =
  makeSchema() as unknown as z.ZodType<Prisma.UserUtensilMaxOrderByAggregateInput>;
export const UserUtensilMaxOrderByAggregateInputObjectZodSchema = makeSchema();
