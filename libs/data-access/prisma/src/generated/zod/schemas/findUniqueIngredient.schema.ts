import type { Prisma } from '../../prisma-client';
import * as z from 'zod';
import { IngredientSelectObjectSchema as IngredientSelectObjectSchema } from './objects/IngredientSelect.schema';
import { IngredientWhereUniqueInputObjectSchema as IngredientWhereUniqueInputObjectSchema } from './objects/IngredientWhereUniqueInput.schema';

export const IngredientFindUniqueSchema: z.ZodType<Prisma.IngredientFindUniqueArgs> = z.object({ select: IngredientSelectObjectSchema.optional(),  where: IngredientWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.IngredientFindUniqueArgs>;

export const IngredientFindUniqueZodSchema = z.object({ select: IngredientSelectObjectSchema.optional(),  where: IngredientWhereUniqueInputObjectSchema }).strict();