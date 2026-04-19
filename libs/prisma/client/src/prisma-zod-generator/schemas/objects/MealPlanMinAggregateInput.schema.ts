import * as z from 'zod';
import type { Prisma } from '@prisma/client';

const makeSchema = () =>
  z
    .object({
      id: z.literal(true).optional(),
      userId: z.literal(true).optional(),
      name: z.literal(true).optional(),
      startDate: z.literal(true).optional(),
      endDate: z.literal(true).optional(),
      createdAt: z.literal(true).optional(),
      updatedAt: z.literal(true).optional(),
    })
    .strict();
export const MealPlanMinAggregateInputObjectSchema: z.ZodType<Prisma.MealPlanMinAggregateInputType> =
  makeSchema() as unknown as z.ZodType<Prisma.MealPlanMinAggregateInputType>;
export const MealPlanMinAggregateInputObjectZodSchema = makeSchema();
