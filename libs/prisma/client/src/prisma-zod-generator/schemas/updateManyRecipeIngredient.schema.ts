import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { RecipeIngredientUpdateManyMutationInputObjectSchema as RecipeIngredientUpdateManyMutationInputObjectSchema } from './objects/RecipeIngredientUpdateManyMutationInput.schema';
import { RecipeIngredientWhereInputObjectSchema as RecipeIngredientWhereInputObjectSchema } from './objects/RecipeIngredientWhereInput.schema';

export const RecipeIngredientUpdateManySchema: z.ZodType<Prisma.RecipeIngredientUpdateManyArgs> =
  z
    .object({
      data: RecipeIngredientUpdateManyMutationInputObjectSchema,
      where: RecipeIngredientWhereInputObjectSchema.optional(),
    })
    .strict() as unknown as z.ZodType<Prisma.RecipeIngredientUpdateManyArgs>;

export const RecipeIngredientUpdateManyZodSchema = z
  .object({
    data: RecipeIngredientUpdateManyMutationInputObjectSchema,
    where: RecipeIngredientWhereInputObjectSchema.optional(),
  })
  .strict();
