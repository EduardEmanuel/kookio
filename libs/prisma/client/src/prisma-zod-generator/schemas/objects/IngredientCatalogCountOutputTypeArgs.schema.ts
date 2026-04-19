import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { IngredientCatalogCountOutputTypeSelectObjectSchema as IngredientCatalogCountOutputTypeSelectObjectSchema } from './IngredientCatalogCountOutputTypeSelect.schema';

const makeSchema = () =>
  z
    .object({
      select: z
        .lazy(() => IngredientCatalogCountOutputTypeSelectObjectSchema)
        .optional(),
    })
    .strict();
export const IngredientCatalogCountOutputTypeArgsObjectSchema = makeSchema();
export const IngredientCatalogCountOutputTypeArgsObjectZodSchema = makeSchema();
