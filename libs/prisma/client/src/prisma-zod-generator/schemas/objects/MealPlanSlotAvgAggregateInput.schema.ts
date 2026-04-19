import * as z from 'zod';
import type { Prisma } from '@prisma/client';

const makeSchema = () =>
  z
    .object({
      servings: z.literal(true).optional(),
    })
    .strict();
export const MealPlanSlotAvgAggregateInputObjectSchema: z.ZodType<Prisma.MealPlanSlotAvgAggregateInputType> =
  makeSchema() as unknown as z.ZodType<Prisma.MealPlanSlotAvgAggregateInputType>;
export const MealPlanSlotAvgAggregateInputObjectZodSchema = makeSchema();
