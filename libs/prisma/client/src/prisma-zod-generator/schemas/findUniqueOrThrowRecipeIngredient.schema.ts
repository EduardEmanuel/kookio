import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { RecipeIngredientSelectObjectSchema as RecipeIngredientSelectObjectSchema } from './objects/RecipeIngredientSelect.schema';
import { RecipeIngredientIncludeObjectSchema as RecipeIngredientIncludeObjectSchema } from './objects/RecipeIngredientInclude.schema';
import { RecipeIngredientWhereUniqueInputObjectSchema as RecipeIngredientWhereUniqueInputObjectSchema } from './objects/RecipeIngredientWhereUniqueInput.schema';

export const RecipeIngredientFindUniqueOrThrowSchema: z.ZodType<Prisma.RecipeIngredientFindUniqueOrThrowArgs> =
  z
    .object({
      select: RecipeIngredientSelectObjectSchema.optional(),
      include: RecipeIngredientIncludeObjectSchema.optional(),
      where: RecipeIngredientWhereUniqueInputObjectSchema,
    })
    .strict() as unknown as z.ZodType<Prisma.RecipeIngredientFindUniqueOrThrowArgs>;

export const RecipeIngredientFindUniqueOrThrowZodSchema = z
  .object({
    select: RecipeIngredientSelectObjectSchema.optional(),
    include: RecipeIngredientIncludeObjectSchema.optional(),
    where: RecipeIngredientWhereUniqueInputObjectSchema,
  })
  .strict();
