import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RecipeCollectionArgsObjectSchema as RecipeCollectionArgsObjectSchema } from './RecipeCollectionArgs.schema';
import { RecipeArgsObjectSchema as RecipeArgsObjectSchema } from './RecipeArgs.schema';

const makeSchema = () =>
  z
    .object({
      collectionId: z.boolean().optional(),
      recipeId: z.boolean().optional(),
      addedAt: z.boolean().optional(),
      collection: z
        .union([z.boolean(), z.lazy(() => RecipeCollectionArgsObjectSchema)])
        .optional(),
      recipe: z
        .union([z.boolean(), z.lazy(() => RecipeArgsObjectSchema)])
        .optional(),
    })
    .strict();
export const RecipeCollectionEntrySelectObjectSchema: z.ZodType<Prisma.RecipeCollectionEntrySelect> =
  makeSchema() as unknown as z.ZodType<Prisma.RecipeCollectionEntrySelect>;
export const RecipeCollectionEntrySelectObjectZodSchema = makeSchema();
