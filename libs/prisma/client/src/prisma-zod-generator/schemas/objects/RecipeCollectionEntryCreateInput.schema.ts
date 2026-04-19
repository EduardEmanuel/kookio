import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RecipeCollectionCreateNestedOneWithoutRecipesInputObjectSchema as RecipeCollectionCreateNestedOneWithoutRecipesInputObjectSchema } from './RecipeCollectionCreateNestedOneWithoutRecipesInput.schema';
import { RecipeCreateNestedOneWithoutCollectionEntriesInputObjectSchema as RecipeCreateNestedOneWithoutCollectionEntriesInputObjectSchema } from './RecipeCreateNestedOneWithoutCollectionEntriesInput.schema';

const makeSchema = () =>
  z
    .object({
      addedAt: z.coerce.date().optional(),
      collection: z.lazy(
        () => RecipeCollectionCreateNestedOneWithoutRecipesInputObjectSchema,
      ),
      recipe: z.lazy(
        () => RecipeCreateNestedOneWithoutCollectionEntriesInputObjectSchema,
      ),
    })
    .strict();
export const RecipeCollectionEntryCreateInputObjectSchema: z.ZodType<Prisma.RecipeCollectionEntryCreateInput> =
  makeSchema() as unknown as z.ZodType<Prisma.RecipeCollectionEntryCreateInput>;
export const RecipeCollectionEntryCreateInputObjectZodSchema = makeSchema();
