import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';

const makeSchema = () =>
  z
    .object({
      id: SortOrderSchema.optional(),
      externalId: SortOrderSchema.optional(),
      name: SortOrderSchema.optional(),
      flag: SortOrderSchema.optional(),
      createdAt: SortOrderSchema.optional(),
    })
    .strict();
export const MealAreaMaxOrderByAggregateInputObjectSchema: z.ZodType<Prisma.MealAreaMaxOrderByAggregateInput> =
  makeSchema() as unknown as z.ZodType<Prisma.MealAreaMaxOrderByAggregateInput>;
export const MealAreaMaxOrderByAggregateInputObjectZodSchema = makeSchema();
