import * as z from 'zod';
import type { Prisma } from '@prisma/client';

const makeSchema = () =>
  z
    .object({
      recipeId: z.string(),
      tag: z.string(),
    })
    .strict();
export const RecipeTagRecipeIdTagCompoundUniqueInputObjectSchema: z.ZodType<Prisma.RecipeTagRecipeIdTagCompoundUniqueInput> =
  makeSchema() as unknown as z.ZodType<Prisma.RecipeTagRecipeIdTagCompoundUniqueInput>;
export const RecipeTagRecipeIdTagCompoundUniqueInputObjectZodSchema =
  makeSchema();
