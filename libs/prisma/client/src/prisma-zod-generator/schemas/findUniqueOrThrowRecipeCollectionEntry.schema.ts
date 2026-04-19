import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { RecipeCollectionEntrySelectObjectSchema as RecipeCollectionEntrySelectObjectSchema } from './objects/RecipeCollectionEntrySelect.schema';
import { RecipeCollectionEntryIncludeObjectSchema as RecipeCollectionEntryIncludeObjectSchema } from './objects/RecipeCollectionEntryInclude.schema';
import { RecipeCollectionEntryWhereUniqueInputObjectSchema as RecipeCollectionEntryWhereUniqueInputObjectSchema } from './objects/RecipeCollectionEntryWhereUniqueInput.schema';

export const RecipeCollectionEntryFindUniqueOrThrowSchema: z.ZodType<Prisma.RecipeCollectionEntryFindUniqueOrThrowArgs> =
  z
    .object({
      select: RecipeCollectionEntrySelectObjectSchema.optional(),
      include: RecipeCollectionEntryIncludeObjectSchema.optional(),
      where: RecipeCollectionEntryWhereUniqueInputObjectSchema,
    })
    .strict() as unknown as z.ZodType<Prisma.RecipeCollectionEntryFindUniqueOrThrowArgs>;

export const RecipeCollectionEntryFindUniqueOrThrowZodSchema = z
  .object({
    select: RecipeCollectionEntrySelectObjectSchema.optional(),
    include: RecipeCollectionEntryIncludeObjectSchema.optional(),
    where: RecipeCollectionEntryWhereUniqueInputObjectSchema,
  })
  .strict();
