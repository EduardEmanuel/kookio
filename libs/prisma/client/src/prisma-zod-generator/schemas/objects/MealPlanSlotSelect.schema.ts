import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { MealPlanArgsObjectSchema as MealPlanArgsObjectSchema } from './MealPlanArgs.schema';
import { RecipeArgsObjectSchema as RecipeArgsObjectSchema } from './RecipeArgs.schema';

const makeSchema = () =>
  z
    .object({
      id: z.boolean().optional(),
      mealPlanId: z.boolean().optional(),
      recipeId: z.boolean().optional(),
      date: z.boolean().optional(),
      slotType: z.boolean().optional(),
      servings: z.boolean().optional(),
      mealPlan: z
        .union([z.boolean(), z.lazy(() => MealPlanArgsObjectSchema)])
        .optional(),
      recipe: z
        .union([z.boolean(), z.lazy(() => RecipeArgsObjectSchema)])
        .optional(),
    })
    .strict();
export const MealPlanSlotSelectObjectSchema: z.ZodType<Prisma.MealPlanSlotSelect> =
  makeSchema() as unknown as z.ZodType<Prisma.MealPlanSlotSelect>;
export const MealPlanSlotSelectObjectZodSchema = makeSchema();
