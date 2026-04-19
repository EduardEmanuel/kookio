import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RecipeCollectionEntrySelectObjectSchema as RecipeCollectionEntrySelectObjectSchema } from './RecipeCollectionEntrySelect.schema';
import { RecipeCollectionEntryIncludeObjectSchema as RecipeCollectionEntryIncludeObjectSchema } from './RecipeCollectionEntryInclude.schema';

const makeSchema = () =>
  z
    .object({
      select: z.lazy(() => RecipeCollectionEntrySelectObjectSchema).optional(),
      include: z
        .lazy(() => RecipeCollectionEntryIncludeObjectSchema)
        .optional(),
    })
    .strict();
export const RecipeCollectionEntryArgsObjectSchema = makeSchema();
export const RecipeCollectionEntryArgsObjectZodSchema = makeSchema();
