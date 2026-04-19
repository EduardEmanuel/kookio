import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { RecipeIngredientWhereInputObjectSchema as RecipeIngredientWhereInputObjectSchema } from './objects/RecipeIngredientWhereInput.schema';

export const RecipeIngredientDeleteManySchema: z.ZodType<Prisma.RecipeIngredientDeleteManyArgs> =
  z
    .object({ where: RecipeIngredientWhereInputObjectSchema.optional() })
    .strict() as unknown as z.ZodType<Prisma.RecipeIngredientDeleteManyArgs>;

export const RecipeIngredientDeleteManyZodSchema = z
  .object({ where: RecipeIngredientWhereInputObjectSchema.optional() })
  .strict();
