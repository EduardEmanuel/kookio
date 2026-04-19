import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { IngredientCatalogSelectObjectSchema as IngredientCatalogSelectObjectSchema } from './IngredientCatalogSelect.schema';
import { IngredientCatalogIncludeObjectSchema as IngredientCatalogIncludeObjectSchema } from './IngredientCatalogInclude.schema';

const makeSchema = () =>
  z
    .object({
      select: z.lazy(() => IngredientCatalogSelectObjectSchema).optional(),
      include: z.lazy(() => IngredientCatalogIncludeObjectSchema).optional(),
    })
    .strict();
export const IngredientCatalogArgsObjectSchema = makeSchema();
export const IngredientCatalogArgsObjectZodSchema = makeSchema();
