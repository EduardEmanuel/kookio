import * as z from 'zod';
import type { Prisma } from '../../../../../generated/prisma-client';


const makeSchema = () => z.object({
  quantity: z.literal(true).optional()
}).strict();
export const IngredientAvgAggregateInputObjectSchema: z.ZodType<Prisma.IngredientAvgAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.IngredientAvgAggregateInputType>;
export const IngredientAvgAggregateInputObjectZodSchema = makeSchema();
