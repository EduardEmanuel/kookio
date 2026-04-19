import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { RecipeIngredientSelectObjectSchema as RecipeIngredientSelectObjectSchema } from './objects/RecipeIngredientSelect.schema';
import { RecipeIngredientIncludeObjectSchema as RecipeIngredientIncludeObjectSchema } from './objects/RecipeIngredientInclude.schema';
import { RecipeIngredientCreateInputObjectSchema as RecipeIngredientCreateInputObjectSchema } from './objects/RecipeIngredientCreateInput.schema';
import { RecipeIngredientUncheckedCreateInputObjectSchema as RecipeIngredientUncheckedCreateInputObjectSchema } from './objects/RecipeIngredientUncheckedCreateInput.schema';

export const RecipeIngredientCreateOneSchema: z.ZodType<Prisma.RecipeIngredientCreateArgs> =
  z
    .object({
      select: RecipeIngredientSelectObjectSchema.optional(),
      include: RecipeIngredientIncludeObjectSchema.optional(),
      data: z.union([
        RecipeIngredientCreateInputObjectSchema,
        RecipeIngredientUncheckedCreateInputObjectSchema,
      ]),
    })
    .strict() as unknown as z.ZodType<Prisma.RecipeIngredientCreateArgs>;

export const RecipeIngredientCreateOneZodSchema = z
  .object({
    select: RecipeIngredientSelectObjectSchema.optional(),
    include: RecipeIngredientIncludeObjectSchema.optional(),
    data: z.union([
      RecipeIngredientCreateInputObjectSchema,
      RecipeIngredientUncheckedCreateInputObjectSchema,
    ]),
  })
  .strict();
