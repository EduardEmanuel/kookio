import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { RecipeCollectionEntrySelectObjectSchema as RecipeCollectionEntrySelectObjectSchema } from './objects/RecipeCollectionEntrySelect.schema';
import { RecipeCollectionEntryIncludeObjectSchema as RecipeCollectionEntryIncludeObjectSchema } from './objects/RecipeCollectionEntryInclude.schema';
import { RecipeCollectionEntryCreateInputObjectSchema as RecipeCollectionEntryCreateInputObjectSchema } from './objects/RecipeCollectionEntryCreateInput.schema';
import { RecipeCollectionEntryUncheckedCreateInputObjectSchema as RecipeCollectionEntryUncheckedCreateInputObjectSchema } from './objects/RecipeCollectionEntryUncheckedCreateInput.schema';

export const RecipeCollectionEntryCreateOneSchema: z.ZodType<Prisma.RecipeCollectionEntryCreateArgs> =
  z
    .object({
      select: RecipeCollectionEntrySelectObjectSchema.optional(),
      include: RecipeCollectionEntryIncludeObjectSchema.optional(),
      data: z.union([
        RecipeCollectionEntryCreateInputObjectSchema,
        RecipeCollectionEntryUncheckedCreateInputObjectSchema,
      ]),
    })
    .strict() as unknown as z.ZodType<Prisma.RecipeCollectionEntryCreateArgs>;

export const RecipeCollectionEntryCreateOneZodSchema = z
  .object({
    select: RecipeCollectionEntrySelectObjectSchema.optional(),
    include: RecipeCollectionEntryIncludeObjectSchema.optional(),
    data: z.union([
      RecipeCollectionEntryCreateInputObjectSchema,
      RecipeCollectionEntryUncheckedCreateInputObjectSchema,
    ]),
  })
  .strict();
