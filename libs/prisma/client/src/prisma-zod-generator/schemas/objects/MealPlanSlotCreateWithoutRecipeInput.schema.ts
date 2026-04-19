import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { MealSlotTypeSchema } from '../enums/MealSlotType.schema';
import { MealPlanCreateNestedOneWithoutSlotsInputObjectSchema as MealPlanCreateNestedOneWithoutSlotsInputObjectSchema } from './MealPlanCreateNestedOneWithoutSlotsInput.schema';

const makeSchema = () =>
  z
    .object({
      id: z.string().optional(),
      date: z.coerce.date(),
      slotType: MealSlotTypeSchema,
      servings: z.number().int().optional(),
      mealPlan: z.lazy(
        () => MealPlanCreateNestedOneWithoutSlotsInputObjectSchema,
      ),
    })
    .strict();
export const MealPlanSlotCreateWithoutRecipeInputObjectSchema: z.ZodType<Prisma.MealPlanSlotCreateWithoutRecipeInput> =
  makeSchema() as unknown as z.ZodType<Prisma.MealPlanSlotCreateWithoutRecipeInput>;
export const MealPlanSlotCreateWithoutRecipeInputObjectZodSchema = makeSchema();
