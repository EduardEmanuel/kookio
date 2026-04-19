import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RecipeCollectionCreateNestedOneWithoutRecipesInputObjectSchema as RecipeCollectionCreateNestedOneWithoutRecipesInputObjectSchema } from './RecipeCollectionCreateNestedOneWithoutRecipesInput.schema';

const makeSchema = () =>
  z
    .object({
      addedAt: z.coerce.date().optional(),
      collection: z.lazy(
        () => RecipeCollectionCreateNestedOneWithoutRecipesInputObjectSchema,
      ),
    })
    .strict();
export const RecipeCollectionEntryCreateWithoutRecipeInputObjectSchema: z.ZodType<Prisma.RecipeCollectionEntryCreateWithoutRecipeInput> =
  makeSchema() as unknown as z.ZodType<Prisma.RecipeCollectionEntryCreateWithoutRecipeInput>;
export const RecipeCollectionEntryCreateWithoutRecipeInputObjectZodSchema =
  makeSchema();
