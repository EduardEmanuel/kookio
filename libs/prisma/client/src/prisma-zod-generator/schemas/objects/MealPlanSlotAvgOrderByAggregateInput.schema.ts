import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';

const makeSchema = () =>
  z
    .object({
      servings: SortOrderSchema.optional(),
    })
    .strict();
export const MealPlanSlotAvgOrderByAggregateInputObjectSchema: z.ZodType<Prisma.MealPlanSlotAvgOrderByAggregateInput> =
  makeSchema() as unknown as z.ZodType<Prisma.MealPlanSlotAvgOrderByAggregateInput>;
export const MealPlanSlotAvgOrderByAggregateInputObjectZodSchema = makeSchema();
