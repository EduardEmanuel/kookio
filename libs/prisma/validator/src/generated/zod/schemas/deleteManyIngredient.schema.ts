import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { IngredientWhereInputObjectSchema as IngredientWhereInputObjectSchema } from './objects/IngredientWhereInput.schema';

export const IngredientDeleteManySchema: z.ZodType<Prisma.IngredientDeleteManyArgs> = z.object({ where: IngredientWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.IngredientDeleteManyArgs>;

export const IngredientDeleteManyZodSchema = z.object({ where: IngredientWhereInputObjectSchema.optional() }).strict();