import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';

const makeSchema = () =>
  z
    .object({
      id: SortOrderSchema.optional(),
      userId: SortOrderSchema.optional(),
      name: SortOrderSchema.optional(),
      startDate: SortOrderSchema.optional(),
      endDate: SortOrderSchema.optional(),
      createdAt: SortOrderSchema.optional(),
      updatedAt: SortOrderSchema.optional(),
    })
    .strict();
export const MealPlanCountOrderByAggregateInputObjectSchema: z.ZodType<Prisma.MealPlanCountOrderByAggregateInput> =
  makeSchema() as unknown as z.ZodType<Prisma.MealPlanCountOrderByAggregateInput>;
export const MealPlanCountOrderByAggregateInputObjectZodSchema = makeSchema();
