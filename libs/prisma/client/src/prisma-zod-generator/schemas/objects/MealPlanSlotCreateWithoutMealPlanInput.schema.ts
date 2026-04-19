import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { MealSlotTypeSchema } from '../enums/MealSlotType.schema';
import { RecipeCreateNestedOneWithoutMealPlanSlotsInputObjectSchema as RecipeCreateNestedOneWithoutMealPlanSlotsInputObjectSchema } from './RecipeCreateNestedOneWithoutMealPlanSlotsInput.schema';

const makeSchema = () =>
  z
    .object({
      id: z.string().optional(),
      date: z.coerce.date(),
      slotType: MealSlotTypeSchema,
      servings: z.number().int().optional(),
      recipe: z
        .lazy(() => RecipeCreateNestedOneWithoutMealPlanSlotsInputObjectSchema)
        .optional(),
    })
    .strict();
export const MealPlanSlotCreateWithoutMealPlanInputObjectSchema: z.ZodType<Prisma.MealPlanSlotCreateWithoutMealPlanInput> =
  makeSchema() as unknown as z.ZodType<Prisma.MealPlanSlotCreateWithoutMealPlanInput>;
export const MealPlanSlotCreateWithoutMealPlanInputObjectZodSchema =
  makeSchema();
