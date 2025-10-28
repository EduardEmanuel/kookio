import * as z from 'zod';
import type { Prisma } from '../../../../../generated/prisma-client';


const makeSchema = () => z.object({
  userId: z.string(),
  name: z.string()
}).strict();
export const IngredientUserIdNameCompoundUniqueInputObjectSchema: z.ZodType<Prisma.IngredientUserIdNameCompoundUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.IngredientUserIdNameCompoundUniqueInput>;
export const IngredientUserIdNameCompoundUniqueInputObjectZodSchema = makeSchema();
