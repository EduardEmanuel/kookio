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
export const RecipeCollectionEntryMaxAggregateInputObjectSchema: z.ZodType<Prisma.RecipeCollectionEntryMaxAggregateInputType> =
  makeSchema() as unknown as z.ZodType<Prisma.RecipeCollectionEntryMaxAggregateInputType>;
export const RecipeCollectionEntryMaxAggregateInputObjectZodSchema =
  makeSchema();
