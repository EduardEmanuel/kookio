import * as z from 'zod';
import type { Prisma } from '@prisma/client';

const makeSchema = () =>
  z
    .object({
      recipeId: z.string(),
      addedAt: z.coerce.date().optional(),
    })
    .strict();
export const RecipeCollectionEntryUncheckedCreateWithoutCollectionInputObjectSchema: z.ZodType<Prisma.RecipeCollectionEntryUncheckedCreateWithoutCollectionInput> =
  makeSchema() as unknown as z.ZodType<Prisma.RecipeCollectionEntryUncheckedCreateWithoutCollectionInput>;
export const RecipeCollectionEntryUncheckedCreateWithoutCollectionInputObjectZodSchema =
  makeSchema();
