import * as z from 'zod';
import type { Prisma } from '@prisma/client';

const makeSchema = () =>
  z
    .object({
      id: z.literal(true).optional(),
      mealPlanId: z.literal(true).optional(),
      recipeId: z.literal(true).optional(),
      date: z.literal(true).optional(),
      slotType: z.literal(true).optional(),
      servings: z.literal(true).optional(),
    })
    .strict();
export const MealPlanSlotMinAggregateInputObjectSchema: z.ZodType<Prisma.MealPlanSlotMinAggregateInputType> =
  makeSchema() as unknown as z.ZodType<Prisma.MealPlanSlotMinAggregateInputType>;
export const MealPlanSlotMinAggregateInputObjectZodSchema = makeSchema();
