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
export const MealPlanSlotUncheckedCreateWithoutMealPlanInputObjectSchema: z.ZodType<Prisma.MealPlanSlotUncheckedCreateWithoutMealPlanInput> =
  makeSchema() as unknown as z.ZodType<Prisma.MealPlanSlotUncheckedCreateWithoutMealPlanInput>;
export const MealPlanSlotUncheckedCreateWithoutMealPlanInputObjectZodSchema =
  makeSchema();
