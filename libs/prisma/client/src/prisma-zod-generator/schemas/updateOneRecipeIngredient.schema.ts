import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { RecipeIngredientSelectObjectSchema as RecipeIngredientSelectObjectSchema } from './objects/RecipeIngredientSelect.schema';
import { RecipeIngredientIncludeObjectSchema as RecipeIngredientIncludeObjectSchema } from './objects/RecipeIngredientInclude.schema';
import { RecipeIngredientUpdateInputObjectSchema as RecipeIngredientUpdateInputObjectSchema } from './objects/RecipeIngredientUpdateInput.schema';
import { RecipeIngredientUncheckedUpdateInputObjectSchema as RecipeIngredientUncheckedUpdateInputObjectSchema } from './objects/RecipeIngredientUncheckedUpdateInput.schema';
import { RecipeIngredientWhereUniqueInputObjectSchema as RecipeIngredientWhereUniqueInputObjectSchema } from './objects/RecipeIngredientWhereUniqueInput.schema';

export const RecipeIngredientUpdateOneSchema: z.ZodType<Prisma.RecipeIngredientUpdateArgs> =
  z
    .object({
      select: RecipeIngredientSelectObjectSchema.optional(),
      include: RecipeIngredientIncludeObjectSchema.optional(),
      data: z.union([
        RecipeIngredientUpdateInputObjectSchema,
        RecipeIngredientUncheckedUpdateInputObjectSchema,
      ]),
      where: RecipeIngredientWhereUniqueInputObjectSchema,
    })
    .strict() as unknown as z.ZodType<Prisma.RecipeIngredientUpdateArgs>;

export const RecipeIngredientUpdateOneZodSchema = z
  .object({
    select: RecipeIngredientSelectObjectSchema.optional(),
    include: RecipeIngredientIncludeObjectSchema.optional(),
    data: z.union([
      RecipeIngredientUpdateInputObjectSchema,
      RecipeIngredientUncheckedUpdateInputObjectSchema,
    ]),
    where: RecipeIngredientWhereUniqueInputObjectSchema,
  })
  .strict();
