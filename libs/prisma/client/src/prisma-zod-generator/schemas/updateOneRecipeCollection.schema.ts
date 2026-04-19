import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { RecipeCollectionSelectObjectSchema as RecipeCollectionSelectObjectSchema } from './objects/RecipeCollectionSelect.schema';
import { RecipeCollectionIncludeObjectSchema as RecipeCollectionIncludeObjectSchema } from './objects/RecipeCollectionInclude.schema';
import { RecipeCollectionUpdateInputObjectSchema as RecipeCollectionUpdateInputObjectSchema } from './objects/RecipeCollectionUpdateInput.schema';
import { RecipeCollectionUncheckedUpdateInputObjectSchema as RecipeCollectionUncheckedUpdateInputObjectSchema } from './objects/RecipeCollectionUncheckedUpdateInput.schema';
import { RecipeCollectionWhereUniqueInputObjectSchema as RecipeCollectionWhereUniqueInputObjectSchema } from './objects/RecipeCollectionWhereUniqueInput.schema';

export const RecipeCollectionUpdateOneSchema: z.ZodType<Prisma.RecipeCollectionUpdateArgs> =
  z
    .object({
      select: RecipeCollectionSelectObjectSchema.optional(),
      include: RecipeCollectionIncludeObjectSchema.optional(),
      data: z.union([
        RecipeCollectionUpdateInputObjectSchema,
        RecipeCollectionUncheckedUpdateInputObjectSchema,
      ]),
      where: RecipeCollectionWhereUniqueInputObjectSchema,
    })
    .strict() as unknown as z.ZodType<Prisma.RecipeCollectionUpdateArgs>;

export const RecipeCollectionUpdateOneZodSchema = z
  .object({
    select: RecipeCollectionSelectObjectSchema.optional(),
    include: RecipeCollectionIncludeObjectSchema.optional(),
    data: z.union([
      RecipeCollectionUpdateInputObjectSchema,
      RecipeCollectionUncheckedUpdateInputObjectSchema,
    ]),
    where: RecipeCollectionWhereUniqueInputObjectSchema,
  })
  .strict();
