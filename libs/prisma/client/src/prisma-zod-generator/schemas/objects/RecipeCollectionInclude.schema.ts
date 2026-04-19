import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserArgsObjectSchema as UserArgsObjectSchema } from './UserArgs.schema';
import { RecipeCollectionEntryFindManySchema as RecipeCollectionEntryFindManySchema } from '../findManyRecipeCollectionEntry.schema';
import { RecipeCollectionCountOutputTypeArgsObjectSchema as RecipeCollectionCountOutputTypeArgsObjectSchema } from './RecipeCollectionCountOutputTypeArgs.schema';

const makeSchema = () =>
  z
    .object({
      user: z
        .union([z.boolean(), z.lazy(() => UserArgsObjectSchema)])
        .optional(),
      recipes: z
        .union([z.boolean(), z.lazy(() => RecipeCollectionEntryFindManySchema)])
        .optional(),
      _count: z
        .union([
          z.boolean(),
          z.lazy(() => RecipeCollectionCountOutputTypeArgsObjectSchema),
        ])
        .optional(),
    })
    .strict();
export const RecipeCollectionIncludeObjectSchema: z.ZodType<Prisma.RecipeCollectionInclude> =
  makeSchema() as unknown as z.ZodType<Prisma.RecipeCollectionInclude>;
export const RecipeCollectionIncludeObjectZodSchema = makeSchema();
