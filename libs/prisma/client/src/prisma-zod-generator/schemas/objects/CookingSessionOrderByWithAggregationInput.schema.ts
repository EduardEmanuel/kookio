import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { CookingSessionCountOrderByAggregateInputObjectSchema as CookingSessionCountOrderByAggregateInputObjectSchema } from './CookingSessionCountOrderByAggregateInput.schema';
import { CookingSessionAvgOrderByAggregateInputObjectSchema as CookingSessionAvgOrderByAggregateInputObjectSchema } from './CookingSessionAvgOrderByAggregateInput.schema';
import { CookingSessionMaxOrderByAggregateInputObjectSchema as CookingSessionMaxOrderByAggregateInputObjectSchema } from './CookingSessionMaxOrderByAggregateInput.schema';
import { CookingSessionMinOrderByAggregateInputObjectSchema as CookingSessionMinOrderByAggregateInputObjectSchema } from './CookingSessionMinOrderByAggregateInput.schema';
import { CookingSessionSumOrderByAggregateInputObjectSchema as CookingSessionSumOrderByAggregateInputObjectSchema } from './CookingSessionSumOrderByAggregateInput.schema';

const makeSchema = () =>
  z
    .object({
      id: SortOrderSchema.optional(),
      userId: SortOrderSchema.optional(),
      recipeId: SortOrderSchema.optional(),
      servings: SortOrderSchema.optional(),
      completedAt: z
        .union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)])
        .optional(),
      createdAt: SortOrderSchema.optional(),
      _count: z
        .lazy(() => CookingSessionCountOrderByAggregateInputObjectSchema)
        .optional(),
      _avg: z
        .lazy(() => CookingSessionAvgOrderByAggregateInputObjectSchema)
        .optional(),
      _max: z
        .lazy(() => CookingSessionMaxOrderByAggregateInputObjectSchema)
        .optional(),
      _min: z
        .lazy(() => CookingSessionMinOrderByAggregateInputObjectSchema)
        .optional(),
      _sum: z
        .lazy(() => CookingSessionSumOrderByAggregateInputObjectSchema)
        .optional(),
    })
    .strict();
export const CookingSessionOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.CookingSessionOrderByWithAggregationInput> =
  makeSchema() as unknown as z.ZodType<Prisma.CookingSessionOrderByWithAggregationInput>;
export const CookingSessionOrderByWithAggregationInputObjectZodSchema =
  makeSchema();
