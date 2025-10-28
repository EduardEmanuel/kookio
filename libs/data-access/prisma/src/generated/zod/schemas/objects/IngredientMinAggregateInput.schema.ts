import * as z from 'zod';
import type { Prisma } from '../../../../../generated/prisma-client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  name: z.literal(true).optional(),
  quantity: z.literal(true).optional(),
  unit: z.literal(true).optional(),
  optional: z.literal(true).optional(),
  userId: z.literal(true).optional(),
  createdAt: z.literal(true).optional()
}).strict();
export const IngredientMinAggregateInputObjectSchema: z.ZodType<Prisma.IngredientMinAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.IngredientMinAggregateInputType>;
export const IngredientMinAggregateInputObjectZodSchema = makeSchema();
