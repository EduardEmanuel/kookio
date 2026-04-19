import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { MealCategoryCountOrderByAggregateInputObjectSchema as MealCategoryCountOrderByAggregateInputObjectSchema } from './MealCategoryCountOrderByAggregateInput.schema';
import { MealCategoryMaxOrderByAggregateInputObjectSchema as MealCategoryMaxOrderByAggregateInputObjectSchema } from './MealCategoryMaxOrderByAggregateInput.schema';
import { MealCategoryMinOrderByAggregateInputObjectSchema as MealCategoryMinOrderByAggregateInputObjectSchema } from './MealCategoryMinOrderByAggregateInput.schema';

const makeSchema = () =>
  z
    .object({
      id: SortOrderSchema.optional(),
      externalId: SortOrderSchema.optional(),
      name: SortOrderSchema.optional(),
      imageUrl: z
        .union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)])
        .optional(),
      description: z
        .union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)])
        .optional(),
      createdAt: SortOrderSchema.optional(),
      _count: z
        .lazy(() => MealCategoryCountOrderByAggregateInputObjectSchema)
        .optional(),
      _max: z
        .lazy(() => MealCategoryMaxOrderByAggregateInputObjectSchema)
        .optional(),
      _min: z
        .lazy(() => MealCategoryMinOrderByAggregateInputObjectSchema)
        .optional(),
    })
    .strict();
export const MealCategoryOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.MealCategoryOrderByWithAggregationInput> =
  makeSchema() as unknown as z.ZodType<Prisma.MealCategoryOrderByWithAggregationInput>;
export const MealCategoryOrderByWithAggregationInputObjectZodSchema =
  makeSchema();
