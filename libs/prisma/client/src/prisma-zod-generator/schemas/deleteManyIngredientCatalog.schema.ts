import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { IngredientCatalogWhereInputObjectSchema as IngredientCatalogWhereInputObjectSchema } from './objects/IngredientCatalogWhereInput.schema';

export const IngredientCatalogDeleteManySchema: z.ZodType<Prisma.IngredientCatalogDeleteManyArgs> =
  z
    .object({ where: IngredientCatalogWhereInputObjectSchema.optional() })
    .strict() as unknown as z.ZodType<Prisma.IngredientCatalogDeleteManyArgs>;

export const IngredientCatalogDeleteManyZodSchema = z
  .object({ where: IngredientCatalogWhereInputObjectSchema.optional() })
  .strict();
