import * as z from 'zod';
import type { Prisma } from '../../../prisma-client';


const makeSchema = () => z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  quantity: z.boolean().optional(),
  unit: z.boolean().optional(),
  optional: z.boolean().optional(),
  userId: z.boolean().optional(),
  createdAt: z.boolean().optional()
}).strict();
export const IngredientSelectObjectSchema: z.ZodType<Prisma.IngredientSelect> = makeSchema() as unknown as z.ZodType<Prisma.IngredientSelect>;
export const IngredientSelectObjectZodSchema = makeSchema();
