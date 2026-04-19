import * as z from 'zod';
import type { Prisma } from '@prisma/client';

const makeSchema = () =>
  z
    .object({
      collectionId: z.string(),
      addedAt: z.coerce.date().optional(),
    })
    .strict();
export const RecipeCollectionEntryUncheckedCreateWithoutRecipeInputObjectSchema: z.ZodType<Prisma.RecipeCollectionEntryUncheckedCreateWithoutRecipeInput> =
  makeSchema() as unknown as z.ZodType<Prisma.RecipeCollectionEntryUncheckedCreateWithoutRecipeInput>;
export const RecipeCollectionEntryUncheckedCreateWithoutRecipeInputObjectZodSchema =
  makeSchema();
