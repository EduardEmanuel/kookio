import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';

const makeSchema = () =>
  z
    .object({
      servings: SortOrderSchema.optional(),
    })
    .strict();
export const MealPlanSlotSumOrderByAggregateInputObjectSchema: z.ZodType<Prisma.MealPlanSlotSumOrderByAggregateInput> =
  makeSchema() as unknown as z.ZodType<Prisma.MealPlanSlotSumOrderByAggregateInput>;
export const MealPlanSlotSumOrderByAggregateInputObjectZodSchema = makeSchema();
