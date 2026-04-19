import * as z from 'zod';
import type { Prisma } from '@prisma/client';

const makeSchema = () =>
  z
    .object({
      recipeId: z.string(),
      addedAt: z.coerce.date().optional(),
    })
    .strict();
export const RecipeCollectionEntryCreateManyCollectionInputObjectSchema: z.ZodType<Prisma.RecipeCollectionEntryCreateManyCollectionInput> =
  makeSchema() as unknown as z.ZodType<Prisma.RecipeCollectionEntryCreateManyCollectionInput>;
export const RecipeCollectionEntryCreateManyCollectionInputObjectZodSchema =
  makeSchema();
