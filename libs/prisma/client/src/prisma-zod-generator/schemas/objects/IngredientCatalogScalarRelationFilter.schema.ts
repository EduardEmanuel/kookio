import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { IngredientCatalogWhereInputObjectSchema as IngredientCatalogWhereInputObjectSchema } from './IngredientCatalogWhereInput.schema';

const makeSchema = () =>
  z
    .object({
      is: z.lazy(() => IngredientCatalogWhereInputObjectSchema).optional(),
      isNot: z.lazy(() => IngredientCatalogWhereInputObjectSchema).optional(),
    })
    .strict();
export const IngredientCatalogScalarRelationFilterObjectSchema: z.ZodType<Prisma.IngredientCatalogScalarRelationFilter> =
  makeSchema() as unknown as z.ZodType<Prisma.IngredientCatalogScalarRelationFilter>;
export const IngredientCatalogScalarRelationFilterObjectZodSchema =
  makeSchema();
