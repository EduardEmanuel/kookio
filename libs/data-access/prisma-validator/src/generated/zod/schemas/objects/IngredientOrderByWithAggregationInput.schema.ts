import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { IngredientCountOrderByAggregateInputObjectSchema as IngredientCountOrderByAggregateInputObjectSchema } from './IngredientCountOrderByAggregateInput.schema';
import { IngredientAvgOrderByAggregateInputObjectSchema as IngredientAvgOrderByAggregateInputObjectSchema } from './IngredientAvgOrderByAggregateInput.schema';
import { IngredientMaxOrderByAggregateInputObjectSchema as IngredientMaxOrderByAggregateInputObjectSchema } from './IngredientMaxOrderByAggregateInput.schema';
import { IngredientMinOrderByAggregateInputObjectSchema as IngredientMinOrderByAggregateInputObjectSchema } from './IngredientMinOrderByAggregateInput.schema';
import { IngredientSumOrderByAggregateInputObjectSchema as IngredientSumOrderByAggregateInputObjectSchema } from './IngredientSumOrderByAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  name: SortOrderSchema.optional(),
  quantity: SortOrderSchema.optional(),
  unit: SortOrderSchema.optional(),
  optional: SortOrderSchema.optional(),
  userId: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  _count: z.lazy(() => IngredientCountOrderByAggregateInputObjectSchema).optional(),
  _avg: z.lazy(() => IngredientAvgOrderByAggregateInputObjectSchema).optional(),
  _max: z.lazy(() => IngredientMaxOrderByAggregateInputObjectSchema).optional(),
  _min: z.lazy(() => IngredientMinOrderByAggregateInputObjectSchema).optional(),
  _sum: z.lazy(() => IngredientSumOrderByAggregateInputObjectSchema).optional()
}).strict();
export const IngredientOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.IngredientOrderByWithAggregationInput> = makeSchema() as unknown as z.ZodType<Prisma.IngredientOrderByWithAggregationInput>;
export const IngredientOrderByWithAggregationInputObjectZodSchema = makeSchema();
