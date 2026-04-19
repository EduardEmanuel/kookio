import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserArgsObjectSchema as UserArgsObjectSchema } from './UserArgs.schema';
import { RecipeCollectionEntryFindManySchema as RecipeCollectionEntryFindManySchema } from '../findManyRecipeCollectionEntry.schema';
import { RecipeCollectionCountOutputTypeArgsObjectSchema as RecipeCollectionCountOutputTypeArgsObjectSchema } from './RecipeCollectionCountOutputTypeArgs.schema';

const makeSchema = () =>
  z
    .object({
      id: z.boolean().optional(),
      userId: z.boolean().optional(),
      name: z.boolean().optional(),
      emoji: z.boolean().optional(),
      createdAt: z.boolean().optional(),
      updatedAt: z.boolean().optional(),
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
export const RecipeCollectionSelectObjectSchema: z.ZodType<Prisma.RecipeCollectionSelect> =
  makeSchema() as unknown as z.ZodType<Prisma.RecipeCollectionSelect>;
export const RecipeCollectionSelectObjectZodSchema = makeSchema();
