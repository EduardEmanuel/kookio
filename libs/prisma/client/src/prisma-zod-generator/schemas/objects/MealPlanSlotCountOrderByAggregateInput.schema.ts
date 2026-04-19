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
export const MealPlanSlotCountOrderByAggregateInputObjectSchema: z.ZodType<Prisma.MealPlanSlotCountOrderByAggregateInput> =
  makeSchema() as unknown as z.ZodType<Prisma.MealPlanSlotCountOrderByAggregateInput>;
export const MealPlanSlotCountOrderByAggregateInputObjectZodSchema =
  makeSchema();
