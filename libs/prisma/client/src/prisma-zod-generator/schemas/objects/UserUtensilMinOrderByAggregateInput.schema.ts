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
export const UserUtensilMinOrderByAggregateInputObjectSchema: z.ZodType<Prisma.UserUtensilMinOrderByAggregateInput> =
  makeSchema() as unknown as z.ZodType<Prisma.UserUtensilMinOrderByAggregateInput>;
export const UserUtensilMinOrderByAggregateInputObjectZodSchema = makeSchema();
