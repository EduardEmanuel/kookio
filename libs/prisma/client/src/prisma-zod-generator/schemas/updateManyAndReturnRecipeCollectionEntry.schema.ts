import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { RecipeCollectionEntrySelectObjectSchema as RecipeCollectionEntrySelectObjectSchema } from './objects/RecipeCollectionEntrySelect.schema';
import { RecipeCollectionEntryUpdateManyMutationInputObjectSchema as RecipeCollectionEntryUpdateManyMutationInputObjectSchema } from './objects/RecipeCollectionEntryUpdateManyMutationInput.schema';
import { RecipeCollectionEntryWhereInputObjectSchema as RecipeCollectionEntryWhereInputObjectSchema } from './objects/RecipeCollectionEntryWhereInput.schema';

export const RecipeCollectionEntryUpdateManyAndReturnSchema: z.ZodType<Prisma.RecipeCollectionEntryUpdateManyAndReturnArgs> =
  z
    .object({
      select: RecipeCollectionEntrySelectObjectSchema.optional(),
      data: RecipeCollectionEntryUpdateManyMutationInputObjectSchema,
      where: RecipeCollectionEntryWhereInputObjectSchema.optional(),
    })
    .strict() as unknown as z.ZodType<Prisma.RecipeCollectionEntryUpdateManyAndReturnArgs>;

export const RecipeCollectionEntryUpdateManyAndReturnZodSchema = z
  .object({
    select: RecipeCollectionEntrySelectObjectSchema.optional(),
    data: RecipeCollectionEntryUpdateManyMutationInputObjectSchema,
    where: RecipeCollectionEntryWhereInputObjectSchema.optional(),
  })
  .strict();
