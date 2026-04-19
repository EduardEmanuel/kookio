import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RecipeCollectionArgsObjectSchema as RecipeCollectionArgsObjectSchema } from './RecipeCollectionArgs.schema';
import { RecipeArgsObjectSchema as RecipeArgsObjectSchema } from './RecipeArgs.schema';

const makeSchema = () =>
  z
    .object({
      collection: z
        .union([z.boolean(), z.lazy(() => RecipeCollectionArgsObjectSchema)])
        .optional(),
      recipe: z
        .union([z.boolean(), z.lazy(() => RecipeArgsObjectSchema)])
        .optional(),
    })
    .strict();
export const RecipeCollectionEntryIncludeObjectSchema: z.ZodType<Prisma.RecipeCollectionEntryInclude> =
  makeSchema() as unknown as z.ZodType<Prisma.RecipeCollectionEntryInclude>;
export const RecipeCollectionEntryIncludeObjectZodSchema = makeSchema();
