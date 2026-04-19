import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { RecipeIngredientSelectObjectSchema as RecipeIngredientSelectObjectSchema } from './objects/RecipeIngredientSelect.schema';
import { RecipeIngredientUpdateManyMutationInputObjectSchema as RecipeIngredientUpdateManyMutationInputObjectSchema } from './objects/RecipeIngredientUpdateManyMutationInput.schema';
import { RecipeIngredientWhereInputObjectSchema as RecipeIngredientWhereInputObjectSchema } from './objects/RecipeIngredientWhereInput.schema';

export const RecipeIngredientUpdateManyAndReturnSchema: z.ZodType<Prisma.RecipeIngredientUpdateManyAndReturnArgs> =
  z
    .object({
      select: RecipeIngredientSelectObjectSchema.optional(),
      data: RecipeIngredientUpdateManyMutationInputObjectSchema,
      where: RecipeIngredientWhereInputObjectSchema.optional(),
    })
    .strict() as unknown as z.ZodType<Prisma.RecipeIngredientUpdateManyAndReturnArgs>;

export const RecipeIngredientUpdateManyAndReturnZodSchema = z
  .object({
    select: RecipeIngredientSelectObjectSchema.optional(),
    data: RecipeIngredientUpdateManyMutationInputObjectSchema,
    where: RecipeIngredientWhereInputObjectSchema.optional(),
  })
  .strict();
