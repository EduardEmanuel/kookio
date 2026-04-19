import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { MealAreaCountOrderByAggregateInputObjectSchema as MealAreaCountOrderByAggregateInputObjectSchema } from './MealAreaCountOrderByAggregateInput.schema';
import { MealAreaMaxOrderByAggregateInputObjectSchema as MealAreaMaxOrderByAggregateInputObjectSchema } from './MealAreaMaxOrderByAggregateInput.schema';
import { MealAreaMinOrderByAggregateInputObjectSchema as MealAreaMinOrderByAggregateInputObjectSchema } from './MealAreaMinOrderByAggregateInput.schema';

const makeSchema = () =>
  z
    .object({
      id: SortOrderSchema.optional(),
      externalId: SortOrderSchema.optional(),
      name: SortOrderSchema.optional(),
      flag: z
        .union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)])
        .optional(),
      createdAt: SortOrderSchema.optional(),
      _count: z
        .lazy(() => MealAreaCountOrderByAggregateInputObjectSchema)
        .optional(),
      _max: z
        .lazy(() => MealAreaMaxOrderByAggregateInputObjectSchema)
        .optional(),
      _min: z
        .lazy(() => MealAreaMinOrderByAggregateInputObjectSchema)
        .optional(),
    })
    .strict();
export const MealAreaOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.MealAreaOrderByWithAggregationInput> =
  makeSchema() as unknown as z.ZodType<Prisma.MealAreaOrderByWithAggregationInput>;
export const MealAreaOrderByWithAggregationInputObjectZodSchema = makeSchema();
