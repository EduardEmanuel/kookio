import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  name: z.literal(true).optional(),
  quantity: z.literal(true).optional(),
  unit: z.literal(true).optional(),
  optional: z.literal(true).optional(),
  userId: z.literal(true).optional(),
  createdAt: z.literal(true).optional(),
  updatedAt: z.literal(true).optional(),
  _all: z.literal(true).optional()
}).strict();
export const IngredientCountAggregateInputObjectSchema: z.ZodType<Prisma.IngredientCountAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.IngredientCountAggregateInputType>;
export const IngredientCountAggregateInputObjectZodSchema = makeSchema();
