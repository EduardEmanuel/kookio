import * as z from 'zod';
import type { Prisma } from '@prisma/client';

const makeSchema = () =>
  z
    .object({
      collectionId: z.literal(true).optional(),
      recipeId: z.literal(true).optional(),
      addedAt: z.literal(true).optional(),
      _all: z.literal(true).optional(),
    })
    .strict();
export const RecipeCollectionEntryCountAggregateInputObjectSchema: z.ZodType<Prisma.RecipeCollectionEntryCountAggregateInputType> =
  makeSchema() as unknown as z.ZodType<Prisma.RecipeCollectionEntryCountAggregateInputType>;
export const RecipeCollectionEntryCountAggregateInputObjectZodSchema =
  makeSchema();
