import * as z from 'zod';
import type { Prisma } from '../../../prisma-client';


const makeSchema = () => z.object({
  id: z.string().optional()
}).strict();
export const IngredientWhereUniqueInputObjectSchema: z.ZodType<Prisma.IngredientWhereUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.IngredientWhereUniqueInput>;
export const IngredientWhereUniqueInputObjectZodSchema = makeSchema();
