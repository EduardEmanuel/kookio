import * as z from 'zod';
import type { Prisma } from '@prisma/client';

const makeSchema = () =>
  z
    .object({
      collectionId: z.string(),
      recipeId: z.string(),
      addedAt: z.coerce.date().optional(),
    })
    .strict();
export const RecipeCollectionEntryUncheckedCreateInputObjectSchema: z.ZodType<Prisma.RecipeCollectionEntryUncheckedCreateInput> =
  makeSchema() as unknown as z.ZodType<Prisma.RecipeCollectionEntryUncheckedCreateInput>;
export const RecipeCollectionEntryUncheckedCreateInputObjectZodSchema =
  makeSchema();
