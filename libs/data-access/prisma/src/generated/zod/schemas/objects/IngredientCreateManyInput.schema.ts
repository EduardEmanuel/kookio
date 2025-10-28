import * as z from 'zod';
import type { Prisma } from '../../../../../generated/prisma-client';


const makeSchema = () => z.object({
  id: z.string().optional(),
  name: z.string(),
  quantity: z.number().int(),
  unit: z.string(),
  optional: z.boolean(),
  userId: z.string(),
  createdAt: z.coerce.date().optional()
}).strict();
export const IngredientCreateManyInputObjectSchema: z.ZodType<Prisma.IngredientCreateManyInput> = makeSchema() as unknown as z.ZodType<Prisma.IngredientCreateManyInput>;
export const IngredientCreateManyInputObjectZodSchema = makeSchema();
