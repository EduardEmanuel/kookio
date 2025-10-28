import * as z from 'zod';
import type { Prisma } from '../../../../../generated/prisma-client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  name: SortOrderSchema.optional(),
  quantity: SortOrderSchema.optional(),
  unit: SortOrderSchema.optional(),
  optional: SortOrderSchema.optional(),
  userId: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional()
}).strict();
export const IngredientMaxOrderByAggregateInputObjectSchema: z.ZodType<Prisma.IngredientMaxOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.IngredientMaxOrderByAggregateInput>;
export const IngredientMaxOrderByAggregateInputObjectZodSchema = makeSchema();
