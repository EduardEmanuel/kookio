import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RecipeIngredientFindManySchema as RecipeIngredientFindManySchema } from '../findManyRecipeIngredient.schema';
import { PantryItemFindManySchema as PantryItemFindManySchema } from '../findManyPantryItem.schema';
import { IngredientCatalogCountOutputTypeArgsObjectSchema as IngredientCatalogCountOutputTypeArgsObjectSchema } from './IngredientCatalogCountOutputTypeArgs.schema';

const makeSchema = () =>
  z
    .object({
      id: z.boolean().optional(),
      externalId: z.boolean().optional(),
      name: z.boolean().optional(),
      normalizedName: z.boolean().optional(),
      description: z.boolean().optional(),
      imageUrl: z.boolean().optional(),
      category: z.boolean().optional(),
      createdAt: z.boolean().optional(),
      updatedAt: z.boolean().optional(),
      recipeIngredients: z
        .union([z.boolean(), z.lazy(() => RecipeIngredientFindManySchema)])
        .optional(),
      pantryItems: z
        .union([z.boolean(), z.lazy(() => PantryItemFindManySchema)])
        .optional(),
      _count: z
        .union([
          z.boolean(),
          z.lazy(() => IngredientCatalogCountOutputTypeArgsObjectSchema),
        ])
        .optional(),
    })
    .strict();
export const IngredientCatalogSelectObjectSchema: z.ZodType<Prisma.IngredientCatalogSelect> =
  makeSchema() as unknown as z.ZodType<Prisma.IngredientCatalogSelect>;
export const IngredientCatalogSelectObjectZodSchema = makeSchema();
