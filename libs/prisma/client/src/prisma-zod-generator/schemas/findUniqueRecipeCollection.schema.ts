import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { RecipeCollectionSelectObjectSchema as RecipeCollectionSelectObjectSchema } from './objects/RecipeCollectionSelect.schema';
import { RecipeCollectionIncludeObjectSchema as RecipeCollectionIncludeObjectSchema } from './objects/RecipeCollectionInclude.schema';
import { RecipeCollectionWhereUniqueInputObjectSchema as RecipeCollectionWhereUniqueInputObjectSchema } from './objects/RecipeCollectionWhereUniqueInput.schema';

export const RecipeCollectionFindUniqueSchema: z.ZodType<Prisma.RecipeCollectionFindUniqueArgs> =
  z
    .object({
      select: RecipeCollectionSelectObjectSchema.optional(),
      include: RecipeCollectionIncludeObjectSchema.optional(),
      where: RecipeCollectionWhereUniqueInputObjectSchema,
    })
    .strict() as unknown as z.ZodType<Prisma.RecipeCollectionFindUniqueArgs>;

export const RecipeCollectionFindUniqueZodSchema = z
  .object({
    select: RecipeCollectionSelectObjectSchema.optional(),
    include: RecipeCollectionIncludeObjectSchema.optional(),
    where: RecipeCollectionWhereUniqueInputObjectSchema,
  })
  .strict();
