import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { RecipeTagWhereInputObjectSchema as RecipeTagWhereInputObjectSchema } from './objects/RecipeTagWhereInput.schema';

export const RecipeTagDeleteManySchema: z.ZodType<Prisma.RecipeTagDeleteManyArgs> =
  z
    .object({ where: RecipeTagWhereInputObjectSchema.optional() })
    .strict() as unknown as z.ZodType<Prisma.RecipeTagDeleteManyArgs>;

export const RecipeTagDeleteManyZodSchema = z
  .object({ where: RecipeTagWhereInputObjectSchema.optional() })
  .strict();
