import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { MealSlotTypeSchema } from '../enums/MealSlotType.schema';

const makeSchema = () =>
  z
    .object({
      mealPlanId: z.string(),
      date: z.date(),
      slotType: MealSlotTypeSchema,
    })
    .strict();
export const MealPlanSlotMealPlanIdDateSlotTypeCompoundUniqueInputObjectSchema: z.ZodType<Prisma.MealPlanSlotMealPlanIdDateSlotTypeCompoundUniqueInput> =
  makeSchema() as unknown as z.ZodType<Prisma.MealPlanSlotMealPlanIdDateSlotTypeCompoundUniqueInput>;
export const MealPlanSlotMealPlanIdDateSlotTypeCompoundUniqueInputObjectZodSchema =
  makeSchema();
