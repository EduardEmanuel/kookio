import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RecipeArgsObjectSchema as RecipeArgsObjectSchema } from './RecipeArgs.schema';
import { IngredientCatalogArgsObjectSchema as IngredientCatalogArgsObjectSchema } from './IngredientCatalogArgs.schema';

const makeSchema = () =>
  z
    .object({
      id: z.boolean().optional(),
      recipeId: z.boolean().optional(),
      ingredientCatalogId: z.boolean().optional(),
      quantity: z.boolean().optional(),
      unit: z.boolean().optional(),
      notes: z.boolean().optional(),
      recipe: z
        .union([z.boolean(), z.lazy(() => RecipeArgsObjectSchema)])
        .optional(),
      ingredient: z
        .union([z.boolean(), z.lazy(() => IngredientCatalogArgsObjectSchema)])
        .optional(),
    })
    .strict();
export const RecipeIngredientSelectObjectSchema: z.ZodType<Prisma.RecipeIngredientSelect> =
  makeSchema() as unknown as z.ZodType<Prisma.RecipeIngredientSelect>;
export const RecipeIngredientSelectObjectZodSchema = makeSchema();
