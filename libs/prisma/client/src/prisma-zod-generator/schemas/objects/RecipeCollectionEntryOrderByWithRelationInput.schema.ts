import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { RecipeCollectionOrderByWithRelationInputObjectSchema as RecipeCollectionOrderByWithRelationInputObjectSchema } from './RecipeCollectionOrderByWithRelationInput.schema';
import { RecipeOrderByWithRelationInputObjectSchema as RecipeOrderByWithRelationInputObjectSchema } from './RecipeOrderByWithRelationInput.schema';

const makeSchema = () =>
  z
    .object({
      collectionId: SortOrderSchema.optional(),
      recipeId: SortOrderSchema.optional(),
      addedAt: SortOrderSchema.optional(),
      collection: z
        .lazy(() => RecipeCollectionOrderByWithRelationInputObjectSchema)
        .optional(),
      recipe: z
        .lazy(() => RecipeOrderByWithRelationInputObjectSchema)
        .optional(),
    })
    .strict();
export const RecipeCollectionEntryOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.RecipeCollectionEntryOrderByWithRelationInput> =
  makeSchema() as unknown as z.ZodType<Prisma.RecipeCollectionEntryOrderByWithRelationInput>;
export const RecipeCollectionEntryOrderByWithRelationInputObjectZodSchema =
  makeSchema();
