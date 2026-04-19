import * as z from 'zod';
import type { Prisma } from '@prisma/client';

const makeSchema = () =>
  z
    .object({
      recipeId: z.string(),
      ingredientCatalogId: z.string(),
    })
    .strict();
export const RecipeIngredientRecipeIdIngredientCatalogIdCompoundUniqueInputObjectSchema: z.ZodType<Prisma.RecipeIngredientRecipeIdIngredientCatalogIdCompoundUniqueInput> =
  makeSchema() as unknown as z.ZodType<Prisma.RecipeIngredientRecipeIdIngredientCatalogIdCompoundUniqueInput>;
export const RecipeIngredientRecipeIdIngredientCatalogIdCompoundUniqueInputObjectZodSchema =
  makeSchema();
