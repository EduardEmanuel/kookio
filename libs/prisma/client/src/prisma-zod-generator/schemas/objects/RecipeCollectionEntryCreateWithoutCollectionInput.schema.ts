import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RecipeCreateNestedOneWithoutCollectionEntriesInputObjectSchema as RecipeCreateNestedOneWithoutCollectionEntriesInputObjectSchema } from './RecipeCreateNestedOneWithoutCollectionEntriesInput.schema';

const makeSchema = () =>
  z
    .object({
      addedAt: z.coerce.date().optional(),
      recipe: z.lazy(
        () => RecipeCreateNestedOneWithoutCollectionEntriesInputObjectSchema,
      ),
    })
    .strict();
export const RecipeCollectionEntryCreateWithoutCollectionInputObjectSchema: z.ZodType<Prisma.RecipeCollectionEntryCreateWithoutCollectionInput> =
  makeSchema() as unknown as z.ZodType<Prisma.RecipeCollectionEntryCreateWithoutCollectionInput>;
export const RecipeCollectionEntryCreateWithoutCollectionInputObjectZodSchema =
  makeSchema();
