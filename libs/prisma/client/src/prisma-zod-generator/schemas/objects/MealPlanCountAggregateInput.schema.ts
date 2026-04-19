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
      _all: z.literal(true).optional(),
    })
    .strict();
export const MealPlanCountAggregateInputObjectSchema: z.ZodType<Prisma.MealPlanCountAggregateInputType> =
  makeSchema() as unknown as z.ZodType<Prisma.MealPlanCountAggregateInputType>;
export const MealPlanCountAggregateInputObjectZodSchema = makeSchema();
