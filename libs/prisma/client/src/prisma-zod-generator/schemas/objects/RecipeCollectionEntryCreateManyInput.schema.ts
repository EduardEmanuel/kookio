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
export const RecipeCollectionEntryCreateManyInputObjectSchema: z.ZodType<Prisma.RecipeCollectionEntryCreateManyInput> =
  makeSchema() as unknown as z.ZodType<Prisma.RecipeCollectionEntryCreateManyInput>;
export const RecipeCollectionEntryCreateManyInputObjectZodSchema = makeSchema();
