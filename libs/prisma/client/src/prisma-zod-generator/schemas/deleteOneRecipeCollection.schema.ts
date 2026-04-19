import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { RecipeCollectionSelectObjectSchema as RecipeCollectionSelectObjectSchema } from './objects/RecipeCollectionSelect.schema';
import { RecipeCollectionIncludeObjectSchema as RecipeCollectionIncludeObjectSchema } from './objects/RecipeCollectionInclude.schema';
import { RecipeCollectionWhereUniqueInputObjectSchema as RecipeCollectionWhereUniqueInputObjectSchema } from './objects/RecipeCollectionWhereUniqueInput.schema';

export const RecipeCollectionDeleteOneSchema: z.ZodType<Prisma.RecipeCollectionDeleteArgs> =
  z
    .object({
      select: RecipeCollectionSelectObjectSchema.optional(),
      include: RecipeCollectionIncludeObjectSchema.optional(),
      where: RecipeCollectionWhereUniqueInputObjectSchema,
    })
    .strict() as unknown as z.ZodType<Prisma.RecipeCollectionDeleteArgs>;

export const RecipeCollectionDeleteOneZodSchema = z
  .object({
    select: RecipeCollectionSelectObjectSchema.optional(),
    include: RecipeCollectionIncludeObjectSchema.optional(),
    where: RecipeCollectionWhereUniqueInputObjectSchema,
  })
  .strict();
