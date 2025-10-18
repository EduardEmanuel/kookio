import type { Prisma } from '../../prisma-client';
import * as z from 'zod';
import { IngredientSelectObjectSchema as IngredientSelectObjectSchema } from './objects/IngredientSelect.schema';
import { IngredientWhereUniqueInputObjectSchema as IngredientWhereUniqueInputObjectSchema } from './objects/IngredientWhereUniqueInput.schema';

export const IngredientDeleteOneSchema: z.ZodType<Prisma.IngredientDeleteArgs> = z.object({ select: IngredientSelectObjectSchema.optional(),  where: IngredientWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.IngredientDeleteArgs>;

export const IngredientDeleteOneZodSchema = z.object({ select: IngredientSelectObjectSchema.optional(),  where: IngredientWhereUniqueInputObjectSchema }).strict();