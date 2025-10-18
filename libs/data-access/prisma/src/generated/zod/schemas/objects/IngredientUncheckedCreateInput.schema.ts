import * as z from 'zod';
import type { Prisma } from '../../../prisma-client';


const makeSchema = () => z.object({
  id: z.string().optional(),
  name: z.string(),
  quantity: z.number().int(),
  unit: z.string(),
  optional: z.boolean(),
  userId: z.string(),
  createdAt: z.coerce.date().optional()
}).strict();
export const IngredientUncheckedCreateInputObjectSchema: z.ZodType<Prisma.IngredientUncheckedCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.IngredientUncheckedCreateInput>;
export const IngredientUncheckedCreateInputObjectZodSchema = makeSchema();
