import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { MealSlotTypeSchema } from '../enums/MealSlotType.schema';

const makeSchema = () =>
  z
    .object({
      id: z.string().optional(),
      recipeId: z.string().optional().nullable(),
      date: z.coerce.date(),
      slotType: MealSlotTypeSchema,
      servings: z.number().int().optional(),
    })
    .strict();
export const MealPlanSlotCreateManyMealPlanInputObjectSchema: z.ZodType<Prisma.MealPlanSlotCreateManyMealPlanInput> =
  makeSchema() as unknown as z.ZodType<Prisma.MealPlanSlotCreateManyMealPlanInput>;
export const MealPlanSlotCreateManyMealPlanInputObjectZodSchema = makeSchema();
