import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { RecipeCollectionEntrySelectObjectSchema as RecipeCollectionEntrySelectObjectSchema } from './objects/RecipeCollectionEntrySelect.schema';
import { RecipeCollectionEntryIncludeObjectSchema as RecipeCollectionEntryIncludeObjectSchema } from './objects/RecipeCollectionEntryInclude.schema';
import { RecipeCollectionEntryWhereUniqueInputObjectSchema as RecipeCollectionEntryWhereUniqueInputObjectSchema } from './objects/RecipeCollectionEntryWhereUniqueInput.schema';

export const RecipeCollectionEntryFindUniqueSchema: z.ZodType<Prisma.RecipeCollectionEntryFindUniqueArgs> =
  z
    .object({
      select: RecipeCollectionEntrySelectObjectSchema.optional(),
      include: RecipeCollectionEntryIncludeObjectSchema.optional(),
      where: RecipeCollectionEntryWhereUniqueInputObjectSchema,
    })
    .strict() as unknown as z.ZodType<Prisma.RecipeCollectionEntryFindUniqueArgs>;

export const RecipeCollectionEntryFindUniqueZodSchema = z
  .object({
    select: RecipeCollectionEntrySelectObjectSchema.optional(),
    include: RecipeCollectionEntryIncludeObjectSchema.optional(),
    where: RecipeCollectionEntryWhereUniqueInputObjectSchema,
  })
  .strict();
