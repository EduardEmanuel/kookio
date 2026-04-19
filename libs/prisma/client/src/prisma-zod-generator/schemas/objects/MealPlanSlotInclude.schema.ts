import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { MealPlanArgsObjectSchema as MealPlanArgsObjectSchema } from './MealPlanArgs.schema';
import { RecipeArgsObjectSchema as RecipeArgsObjectSchema } from './RecipeArgs.schema';

const makeSchema = () =>
  z
    .object({
      mealPlan: z
        .union([z.boolean(), z.lazy(() => MealPlanArgsObjectSchema)])
        .optional(),
      recipe: z
        .union([z.boolean(), z.lazy(() => RecipeArgsObjectSchema)])
        .optional(),
    })
    .strict();
export const MealPlanSlotIncludeObjectSchema: z.ZodType<Prisma.MealPlanSlotInclude> =
  makeSchema() as unknown as z.ZodType<Prisma.MealPlanSlotInclude>;
export const MealPlanSlotIncludeObjectZodSchema = makeSchema();
