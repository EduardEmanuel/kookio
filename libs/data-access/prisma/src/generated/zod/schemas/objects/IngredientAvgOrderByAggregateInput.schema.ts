import * as z from 'zod';
import type { Prisma } from '../../../../../generated/prisma-client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  quantity: SortOrderSchema.optional()
}).strict();
export const IngredientAvgOrderByAggregateInputObjectSchema: z.ZodType<Prisma.IngredientAvgOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.IngredientAvgOrderByAggregateInput>;
export const IngredientAvgOrderByAggregateInputObjectZodSchema = makeSchema();
