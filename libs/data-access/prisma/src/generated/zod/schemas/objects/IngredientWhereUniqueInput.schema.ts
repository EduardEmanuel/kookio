import * as z from 'zod';
import type { Prisma } from '../../../prisma-client';
import { IngredientUserIdNameCompoundUniqueInputObjectSchema as IngredientUserIdNameCompoundUniqueInputObjectSchema } from './IngredientUserIdNameCompoundUniqueInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  userId_name: z.lazy(() => IngredientUserIdNameCompoundUniqueInputObjectSchema).optional()
}).strict();
export const IngredientWhereUniqueInputObjectSchema: z.ZodType<Prisma.IngredientWhereUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.IngredientWhereUniqueInput>;
export const IngredientWhereUniqueInputObjectZodSchema = makeSchema();
