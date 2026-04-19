import * as z from 'zod';
import type { Prisma } from '@prisma/client';

const makeSchema = () =>
  z
    .object({
      recipeIngredients: z.boolean().optional(),
      pantryItems: z.boolean().optional(),
    })
    .strict();
export const IngredientCatalogCountOutputTypeSelectObjectSchema: z.ZodType<Prisma.IngredientCatalogCountOutputTypeSelect> =
  makeSchema() as unknown as z.ZodType<Prisma.IngredientCatalogCountOutputTypeSelect>;
export const IngredientCatalogCountOutputTypeSelectObjectZodSchema =
  makeSchema();
