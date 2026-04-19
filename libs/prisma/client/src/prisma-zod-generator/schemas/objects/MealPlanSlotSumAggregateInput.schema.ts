import * as z from 'zod';
import type { Prisma } from '@prisma/client';

const makeSchema = () =>
  z
    .object({
      servings: z.literal(true).optional(),
    })
    .strict();
export const MealPlanSlotSumAggregateInputObjectSchema: z.ZodType<Prisma.MealPlanSlotSumAggregateInputType> =
  makeSchema() as unknown as z.ZodType<Prisma.MealPlanSlotSumAggregateInputType>;
export const MealPlanSlotSumAggregateInputObjectZodSchema = makeSchema();
