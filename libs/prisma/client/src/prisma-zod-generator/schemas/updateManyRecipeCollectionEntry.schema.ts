import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { RecipeCollectionEntryUpdateManyMutationInputObjectSchema as RecipeCollectionEntryUpdateManyMutationInputObjectSchema } from './objects/RecipeCollectionEntryUpdateManyMutationInput.schema';
import { RecipeCollectionEntryWhereInputObjectSchema as RecipeCollectionEntryWhereInputObjectSchema } from './objects/RecipeCollectionEntryWhereInput.schema';

export const RecipeCollectionEntryUpdateManySchema: z.ZodType<Prisma.RecipeCollectionEntryUpdateManyArgs> =
  z
    .object({
      data: RecipeCollectionEntryUpdateManyMutationInputObjectSchema,
      where: RecipeCollectionEntryWhereInputObjectSchema.optional(),
    })
    .strict() as unknown as z.ZodType<Prisma.RecipeCollectionEntryUpdateManyArgs>;

export const RecipeCollectionEntryUpdateManyZodSchema = z
  .object({
    data: RecipeCollectionEntryUpdateManyMutationInputObjectSchema,
    where: RecipeCollectionEntryWhereInputObjectSchema.optional(),
  })
  .strict();
