import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { MealSlotTypeSchema } from '../enums/MealSlotType.schema';
import { MealPlanCreateNestedOneWithoutSlotsInputObjectSchema as MealPlanCreateNestedOneWithoutSlotsInputObjectSchema } from './MealPlanCreateNestedOneWithoutSlotsInput.schema';
import { RecipeCreateNestedOneWithoutMealPlanSlotsInputObjectSchema as RecipeCreateNestedOneWithoutMealPlanSlotsInputObjectSchema } from './RecipeCreateNestedOneWithoutMealPlanSlotsInput.schema';

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
      recipe: z
        .lazy(() => RecipeCreateNestedOneWithoutMealPlanSlotsInputObjectSchema)
        .optional(),
    })
    .strict();
export const MealPlanSlotCreateInputObjectSchema: z.ZodType<Prisma.MealPlanSlotCreateInput> =
  makeSchema() as unknown as z.ZodType<Prisma.MealPlanSlotCreateInput>;
export const MealPlanSlotCreateInputObjectZodSchema = makeSchema();
