import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { RecipeCollectionSelectObjectSchema as RecipeCollectionSelectObjectSchema } from './objects/RecipeCollectionSelect.schema';
import { RecipeCollectionIncludeObjectSchema as RecipeCollectionIncludeObjectSchema } from './objects/RecipeCollectionInclude.schema';
import { RecipeCollectionWhereUniqueInputObjectSchema as RecipeCollectionWhereUniqueInputObjectSchema } from './objects/RecipeCollectionWhereUniqueInput.schema';
import { RecipeCollectionCreateInputObjectSchema as RecipeCollectionCreateInputObjectSchema } from './objects/RecipeCollectionCreateInput.schema';
import { RecipeCollectionUncheckedCreateInputObjectSchema as RecipeCollectionUncheckedCreateInputObjectSchema } from './objects/RecipeCollectionUncheckedCreateInput.schema';
import { RecipeCollectionUpdateInputObjectSchema as RecipeCollectionUpdateInputObjectSchema } from './objects/RecipeCollectionUpdateInput.schema';
import { RecipeCollectionUncheckedUpdateInputObjectSchema as RecipeCollectionUncheckedUpdateInputObjectSchema } from './objects/RecipeCollectionUncheckedUpdateInput.schema';

export const RecipeCollectionUpsertOneSchema: z.ZodType<Prisma.RecipeCollectionUpsertArgs> =
  z
    .object({
      select: RecipeCollectionSelectObjectSchema.optional(),
      include: RecipeCollectionIncludeObjectSchema.optional(),
      where: RecipeCollectionWhereUniqueInputObjectSchema,
      create: z.union([
        RecipeCollectionCreateInputObjectSchema,
        RecipeCollectionUncheckedCreateInputObjectSchema,
      ]),
      update: z.union([
        RecipeCollectionUpdateInputObjectSchema,
        RecipeCollectionUncheckedUpdateInputObjectSchema,
      ]),
    })
    .strict() as unknown as z.ZodType<Prisma.RecipeCollectionUpsertArgs>;

export const RecipeCollectionUpsertOneZodSchema = z
  .object({
    select: RecipeCollectionSelectObjectSchema.optional(),
    include: RecipeCollectionIncludeObjectSchema.optional(),
    where: RecipeCollectionWhereUniqueInputObjectSchema,
    create: z.union([
      RecipeCollectionCreateInputObjectSchema,
      RecipeCollectionUncheckedCreateInputObjectSchema,
    ]),
    update: z.union([
      RecipeCollectionUpdateInputObjectSchema,
      RecipeCollectionUncheckedUpdateInputObjectSchema,
    ]),
  })
  .strict();
