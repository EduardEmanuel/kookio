import * as z from 'zod';
import type { Prisma } from '@prisma/client';

const makeSchema = () =>
  z
    .object({
      collectionId: z.string(),
      recipeId: z.string(),
    })
    .strict();
export const RecipeCollectionEntryCollectionIdRecipeIdCompoundUniqueInputObjectSchema: z.ZodType<Prisma.RecipeCollectionEntryCollectionIdRecipeIdCompoundUniqueInput> =
  makeSchema() as unknown as z.ZodType<Prisma.RecipeCollectionEntryCollectionIdRecipeIdCompoundUniqueInput>;
export const RecipeCollectionEntryCollectionIdRecipeIdCompoundUniqueInputObjectZodSchema =
  makeSchema();
