import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RecipeCollectionSelectObjectSchema as RecipeCollectionSelectObjectSchema } from './RecipeCollectionSelect.schema';
import { RecipeCollectionIncludeObjectSchema as RecipeCollectionIncludeObjectSchema } from './RecipeCollectionInclude.schema';

const makeSchema = () =>
  z
    .object({
      select: z.lazy(() => RecipeCollectionSelectObjectSchema).optional(),
      include: z.lazy(() => RecipeCollectionIncludeObjectSchema).optional(),
    })
    .strict();
export const RecipeCollectionArgsObjectSchema = makeSchema();
export const RecipeCollectionArgsObjectZodSchema = makeSchema();
