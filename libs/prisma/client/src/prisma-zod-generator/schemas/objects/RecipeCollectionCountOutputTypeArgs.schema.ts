import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RecipeCollectionCountOutputTypeSelectObjectSchema as RecipeCollectionCountOutputTypeSelectObjectSchema } from './RecipeCollectionCountOutputTypeSelect.schema';

const makeSchema = () =>
  z
    .object({
      select: z
        .lazy(() => RecipeCollectionCountOutputTypeSelectObjectSchema)
        .optional(),
    })
    .strict();
export const RecipeCollectionCountOutputTypeArgsObjectSchema = makeSchema();
export const RecipeCollectionCountOutputTypeArgsObjectZodSchema = makeSchema();
