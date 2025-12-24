import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  quantity: z.literal(true).optional()
}).strict();
export const IngredientSumAggregateInputObjectSchema: z.ZodType<Prisma.IngredientSumAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.IngredientSumAggregateInputType>;
export const IngredientSumAggregateInputObjectZodSchema = makeSchema();
