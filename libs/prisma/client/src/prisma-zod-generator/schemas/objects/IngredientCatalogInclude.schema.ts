import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RecipeIngredientFindManySchema as RecipeIngredientFindManySchema } from '../findManyRecipeIngredient.schema';
import { PantryItemFindManySchema as PantryItemFindManySchema } from '../findManyPantryItem.schema';
import { IngredientCatalogCountOutputTypeArgsObjectSchema as IngredientCatalogCountOutputTypeArgsObjectSchema } from './IngredientCatalogCountOutputTypeArgs.schema';

const makeSchema = () =>
  z
    .object({
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
export const IngredientCatalogIncludeObjectSchema: z.ZodType<Prisma.IngredientCatalogInclude> =
  makeSchema() as unknown as z.ZodType<Prisma.IngredientCatalogInclude>;
export const IngredientCatalogIncludeObjectZodSchema = makeSchema();
