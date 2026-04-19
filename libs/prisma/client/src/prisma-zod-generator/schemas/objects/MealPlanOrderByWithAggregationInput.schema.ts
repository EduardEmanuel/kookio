import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { MealPlanCountOrderByAggregateInputObjectSchema as MealPlanCountOrderByAggregateInputObjectSchema } from './MealPlanCountOrderByAggregateInput.schema';
import { MealPlanMaxOrderByAggregateInputObjectSchema as MealPlanMaxOrderByAggregateInputObjectSchema } from './MealPlanMaxOrderByAggregateInput.schema';
import { MealPlanMinOrderByAggregateInputObjectSchema as MealPlanMinOrderByAggregateInputObjectSchema } from './MealPlanMinOrderByAggregateInput.schema';

const makeSchema = () =>
  z
    .object({
      id: SortOrderSchema.optional(),
      userId: SortOrderSchema.optional(),
      name: z
        .union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)])
        .optional(),
      startDate: SortOrderSchema.optional(),
      endDate: SortOrderSchema.optional(),
      createdAt: SortOrderSchema.optional(),
      updatedAt: SortOrderSchema.optional(),
      _count: z
        .lazy(() => MealPlanCountOrderByAggregateInputObjectSchema)
        .optional(),
      _max: z
        .lazy(() => MealPlanMaxOrderByAggregateInputObjectSchema)
        .optional(),
      _min: z
        .lazy(() => MealPlanMinOrderByAggregateInputObjectSchema)
        .optional(),
    })
    .strict();
export const MealPlanOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.MealPlanOrderByWithAggregationInput> =
  makeSchema() as unknown as z.ZodType<Prisma.MealPlanOrderByWithAggregationInput>;
export const MealPlanOrderByWithAggregationInputObjectZodSchema = makeSchema();
