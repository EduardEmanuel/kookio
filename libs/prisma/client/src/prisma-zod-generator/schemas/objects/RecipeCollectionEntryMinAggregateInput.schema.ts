import * as z from 'zod';
import type { Prisma } from '@prisma/client';

const makeSchema = () =>
  z
    .object({
      collectionId: z.literal(true).optional(),
      recipeId: z.literal(true).optional(),
      addedAt: z.literal(true).optional(),
    })
    .strict();
export const RecipeCollectionEntryMinAggregateInputObjectSchema: z.ZodType<Prisma.RecipeCollectionEntryMinAggregateInputType> =
  makeSchema() as unknown as z.ZodType<Prisma.RecipeCollectionEntryMinAggregateInputType>;
export const RecipeCollectionEntryMinAggregateInputObjectZodSchema =
  makeSchema();
