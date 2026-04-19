import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { MealSlotTypeSchema } from '../enums/MealSlotType.schema';

const makeSchema = () =>
  z
    .object({
      id: z.string().optional(),
      mealPlanId: z.string(),
      date: z.coerce.date(),
      slotType: MealSlotTypeSchema,
      servings: z.number().int().optional(),
    })
    .strict();
export const MealPlanSlotUncheckedCreateWithoutRecipeInputObjectSchema: z.ZodType<Prisma.MealPlanSlotUncheckedCreateWithoutRecipeInput> =
  makeSchema() as unknown as z.ZodType<Prisma.MealPlanSlotUncheckedCreateWithoutRecipeInput>;
export const MealPlanSlotUncheckedCreateWithoutRecipeInputObjectZodSchema =
  makeSchema();
