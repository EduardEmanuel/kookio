import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { MealPlanSlotCountOrderByAggregateInputObjectSchema as MealPlanSlotCountOrderByAggregateInputObjectSchema } from './MealPlanSlotCountOrderByAggregateInput.schema';
import { MealPlanSlotAvgOrderByAggregateInputObjectSchema as MealPlanSlotAvgOrderByAggregateInputObjectSchema } from './MealPlanSlotAvgOrderByAggregateInput.schema';
import { MealPlanSlotMaxOrderByAggregateInputObjectSchema as MealPlanSlotMaxOrderByAggregateInputObjectSchema } from './MealPlanSlotMaxOrderByAggregateInput.schema';
import { MealPlanSlotMinOrderByAggregateInputObjectSchema as MealPlanSlotMinOrderByAggregateInputObjectSchema } from './MealPlanSlotMinOrderByAggregateInput.schema';
import { MealPlanSlotSumOrderByAggregateInputObjectSchema as MealPlanSlotSumOrderByAggregateInputObjectSchema } from './MealPlanSlotSumOrderByAggregateInput.schema';

const makeSchema = () =>
  z
    .object({
      id: SortOrderSchema.optional(),
      mealPlanId: SortOrderSchema.optional(),
      recipeId: z
        .union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)])
        .optional(),
      date: SortOrderSchema.optional(),
      slotType: SortOrderSchema.optional(),
      servings: SortOrderSchema.optional(),
      _count: z
        .lazy(() => MealPlanSlotCountOrderByAggregateInputObjectSchema)
        .optional(),
      _avg: z
        .lazy(() => MealPlanSlotAvgOrderByAggregateInputObjectSchema)
        .optional(),
      _max: z
        .lazy(() => MealPlanSlotMaxOrderByAggregateInputObjectSchema)
        .optional(),
      _min: z
        .lazy(() => MealPlanSlotMinOrderByAggregateInputObjectSchema)
        .optional(),
      _sum: z
        .lazy(() => MealPlanSlotSumOrderByAggregateInputObjectSchema)
        .optional(),
    })
    .strict();
export const MealPlanSlotOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.MealPlanSlotOrderByWithAggregationInput> =
  makeSchema() as unknown as z.ZodType<Prisma.MealPlanSlotOrderByWithAggregationInput>;
export const MealPlanSlotOrderByWithAggregationInputObjectZodSchema =
  makeSchema();
