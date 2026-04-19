import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { RecipeCollectionEntrySelectObjectSchema as RecipeCollectionEntrySelectObjectSchema } from './objects/RecipeCollectionEntrySelect.schema';
import { RecipeCollectionEntryIncludeObjectSchema as RecipeCollectionEntryIncludeObjectSchema } from './objects/RecipeCollectionEntryInclude.schema';
import { RecipeCollectionEntryUpdateInputObjectSchema as RecipeCollectionEntryUpdateInputObjectSchema } from './objects/RecipeCollectionEntryUpdateInput.schema';
import { RecipeCollectionEntryUncheckedUpdateInputObjectSchema as RecipeCollectionEntryUncheckedUpdateInputObjectSchema } from './objects/RecipeCollectionEntryUncheckedUpdateInput.schema';
import { RecipeCollectionEntryWhereUniqueInputObjectSchema as RecipeCollectionEntryWhereUniqueInputObjectSchema } from './objects/RecipeCollectionEntryWhereUniqueInput.schema';

export const RecipeCollectionEntryUpdateOneSchema: z.ZodType<Prisma.RecipeCollectionEntryUpdateArgs> =
  z
    .object({
      select: RecipeCollectionEntrySelectObjectSchema.optional(),
      include: RecipeCollectionEntryIncludeObjectSchema.optional(),
      data: z.union([
        RecipeCollectionEntryUpdateInputObjectSchema,
        RecipeCollectionEntryUncheckedUpdateInputObjectSchema,
      ]),
      where: RecipeCollectionEntryWhereUniqueInputObjectSchema,
    })
    .strict() as unknown as z.ZodType<Prisma.RecipeCollectionEntryUpdateArgs>;

export const RecipeCollectionEntryUpdateOneZodSchema = z
  .object({
    select: RecipeCollectionEntrySelectObjectSchema.optional(),
    include: RecipeCollectionEntryIncludeObjectSchema.optional(),
    data: z.union([
      RecipeCollectionEntryUpdateInputObjectSchema,
      RecipeCollectionEntryUncheckedUpdateInputObjectSchema,
    ]),
    where: RecipeCollectionEntryWhereUniqueInputObjectSchema,
  })
  .strict();
