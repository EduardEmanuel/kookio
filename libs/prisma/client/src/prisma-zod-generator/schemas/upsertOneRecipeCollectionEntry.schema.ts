import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { RecipeCollectionEntrySelectObjectSchema as RecipeCollectionEntrySelectObjectSchema } from './objects/RecipeCollectionEntrySelect.schema';
import { RecipeCollectionEntryIncludeObjectSchema as RecipeCollectionEntryIncludeObjectSchema } from './objects/RecipeCollectionEntryInclude.schema';
import { RecipeCollectionEntryWhereUniqueInputObjectSchema as RecipeCollectionEntryWhereUniqueInputObjectSchema } from './objects/RecipeCollectionEntryWhereUniqueInput.schema';
import { RecipeCollectionEntryCreateInputObjectSchema as RecipeCollectionEntryCreateInputObjectSchema } from './objects/RecipeCollectionEntryCreateInput.schema';
import { RecipeCollectionEntryUncheckedCreateInputObjectSchema as RecipeCollectionEntryUncheckedCreateInputObjectSchema } from './objects/RecipeCollectionEntryUncheckedCreateInput.schema';
import { RecipeCollectionEntryUpdateInputObjectSchema as RecipeCollectionEntryUpdateInputObjectSchema } from './objects/RecipeCollectionEntryUpdateInput.schema';
import { RecipeCollectionEntryUncheckedUpdateInputObjectSchema as RecipeCollectionEntryUncheckedUpdateInputObjectSchema } from './objects/RecipeCollectionEntryUncheckedUpdateInput.schema';

export const RecipeCollectionEntryUpsertOneSchema: z.ZodType<Prisma.RecipeCollectionEntryUpsertArgs> =
  z
    .object({
      select: RecipeCollectionEntrySelectObjectSchema.optional(),
      include: RecipeCollectionEntryIncludeObjectSchema.optional(),
      where: RecipeCollectionEntryWhereUniqueInputObjectSchema,
      create: z.union([
        RecipeCollectionEntryCreateInputObjectSchema,
        RecipeCollectionEntryUncheckedCreateInputObjectSchema,
      ]),
      update: z.union([
        RecipeCollectionEntryUpdateInputObjectSchema,
        RecipeCollectionEntryUncheckedUpdateInputObjectSchema,
      ]),
    })
    .strict() as unknown as z.ZodType<Prisma.RecipeCollectionEntryUpsertArgs>;

export const RecipeCollectionEntryUpsertOneZodSchema = z
  .object({
    select: RecipeCollectionEntrySelectObjectSchema.optional(),
    include: RecipeCollectionEntryIncludeObjectSchema.optional(),
    where: RecipeCollectionEntryWhereUniqueInputObjectSchema,
    create: z.union([
      RecipeCollectionEntryCreateInputObjectSchema,
      RecipeCollectionEntryUncheckedCreateInputObjectSchema,
    ]),
    update: z.union([
      RecipeCollectionEntryUpdateInputObjectSchema,
      RecipeCollectionEntryUncheckedUpdateInputObjectSchema,
    ]),
  })
  .strict();
