import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { RecipeCollectionSelectObjectSchema as RecipeCollectionSelectObjectSchema } from './objects/RecipeCollectionSelect.schema';
import { RecipeCollectionIncludeObjectSchema as RecipeCollectionIncludeObjectSchema } from './objects/RecipeCollectionInclude.schema';
import { RecipeCollectionCreateInputObjectSchema as RecipeCollectionCreateInputObjectSchema } from './objects/RecipeCollectionCreateInput.schema';
import { RecipeCollectionUncheckedCreateInputObjectSchema as RecipeCollectionUncheckedCreateInputObjectSchema } from './objects/RecipeCollectionUncheckedCreateInput.schema';

export const RecipeCollectionCreateOneSchema: z.ZodType<Prisma.RecipeCollectionCreateArgs> =
  z
    .object({
      select: RecipeCollectionSelectObjectSchema.optional(),
      include: RecipeCollectionIncludeObjectSchema.optional(),
      data: z.union([
        RecipeCollectionCreateInputObjectSchema,
        RecipeCollectionUncheckedCreateInputObjectSchema,
      ]),
    })
    .strict() as unknown as z.ZodType<Prisma.RecipeCollectionCreateArgs>;

export const RecipeCollectionCreateOneZodSchema = z
  .object({
    select: RecipeCollectionSelectObjectSchema.optional(),
    include: RecipeCollectionIncludeObjectSchema.optional(),
    data: z.union([
      RecipeCollectionCreateInputObjectSchema,
      RecipeCollectionUncheckedCreateInputObjectSchema,
    ]),
  })
  .strict();
