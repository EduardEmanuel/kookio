import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';

const makeSchema = () =>
  z
    .object({
      id: SortOrderSchema.optional(),
      mealPlanId: SortOrderSchema.optional(),
      recipeId: SortOrderSchema.optional(),
      date: SortOrderSchema.optional(),
      slotType: SortOrderSchema.optional(),
      servings: SortOrderSchema.optional(),
    })
    .strict();
export const MealPlanSlotMinOrderByAggregateInputObjectSchema: z.ZodType<Prisma.MealPlanSlotMinOrderByAggregateInput> =
  makeSchema() as unknown as z.ZodType<Prisma.MealPlanSlotMinOrderByAggregateInput>;
export const MealPlanSlotMinOrderByAggregateInputObjectZodSchema = makeSchema();
