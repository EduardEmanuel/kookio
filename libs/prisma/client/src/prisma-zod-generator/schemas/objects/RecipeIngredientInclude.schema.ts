import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RecipeArgsObjectSchema as RecipeArgsObjectSchema } from './RecipeArgs.schema';
import { IngredientCatalogArgsObjectSchema as IngredientCatalogArgsObjectSchema } from './IngredientCatalogArgs.schema';

const makeSchema = () =>
  z
    .object({
      recipe: z
        .union([z.boolean(), z.lazy(() => RecipeArgsObjectSchema)])
        .optional(),
      ingredient: z
        .union([z.boolean(), z.lazy(() => IngredientCatalogArgsObjectSchema)])
        .optional(),
    })
    .strict();
export const RecipeIngredientIncludeObjectSchema: z.ZodType<Prisma.RecipeIngredientInclude> =
  makeSchema() as unknown as z.ZodType<Prisma.RecipeIngredientInclude>;
export const RecipeIngredientIncludeObjectZodSchema = makeSchema();
