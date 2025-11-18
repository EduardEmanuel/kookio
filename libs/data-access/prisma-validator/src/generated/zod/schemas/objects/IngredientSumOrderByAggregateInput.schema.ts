import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  quantity: SortOrderSchema.optional()
}).strict();
export const IngredientSumOrderByAggregateInputObjectSchema: z.ZodType<Prisma.IngredientSumOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.IngredientSumOrderByAggregateInput>;
export const IngredientSumOrderByAggregateInputObjectZodSchema = makeSchema();
