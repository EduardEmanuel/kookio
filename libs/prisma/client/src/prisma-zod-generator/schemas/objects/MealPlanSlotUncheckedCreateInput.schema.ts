import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { MealSlotTypeSchema } from '../enums/MealSlotType.schema';

const makeSchema = () =>
  z
    .object({
      id: z.string().optional(),
      mealPlanId: z.string(),
      recipeId: z.string().optional().nullable(),
      date: z.coerce.date(),
      slotType: MealSlotTypeSchema,
      servings: z.number().int().optional(),
    })
    .strict();
export const MealPlanSlotUncheckedCreateInputObjectSchema: z.ZodType<Prisma.MealPlanSlotUncheckedCreateInput> =
  makeSchema() as unknown as z.ZodType<Prisma.MealPlanSlotUncheckedCreateInput>;
export const MealPlanSlotUncheckedCreateInputObjectZodSchema = makeSchema();
