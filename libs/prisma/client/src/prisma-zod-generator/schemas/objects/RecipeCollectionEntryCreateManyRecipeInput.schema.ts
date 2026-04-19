import * as z from 'zod';
import type { Prisma } from '@prisma/client';

const makeSchema = () =>
  z
    .object({
      collectionId: z.string(),
      addedAt: z.coerce.date().optional(),
    })
    .strict();
export const RecipeCollectionEntryCreateManyRecipeInputObjectSchema: z.ZodType<Prisma.RecipeCollectionEntryCreateManyRecipeInput> =
  makeSchema() as unknown as z.ZodType<Prisma.RecipeCollectionEntryCreateManyRecipeInput>;
export const RecipeCollectionEntryCreateManyRecipeInputObjectZodSchema =
  makeSchema();
