import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { IngredientCatalogUpdateManyMutationInputObjectSchema as IngredientCatalogUpdateManyMutationInputObjectSchema } from './objects/IngredientCatalogUpdateManyMutationInput.schema';
import { IngredientCatalogWhereInputObjectSchema as IngredientCatalogWhereInputObjectSchema } from './objects/IngredientCatalogWhereInput.schema';

export const IngredientCatalogUpdateManySchema: z.ZodType<Prisma.IngredientCatalogUpdateManyArgs> =
  z
    .object({
      data: IngredientCatalogUpdateManyMutationInputObjectSchema,
      where: IngredientCatalogWhereInputObjectSchema.optional(),
    })
    .strict() as unknown as z.ZodType<Prisma.IngredientCatalogUpdateManyArgs>;

export const IngredientCatalogUpdateManyZodSchema = z
  .object({
    data: IngredientCatalogUpdateManyMutationInputObjectSchema,
    where: IngredientCatalogWhereInputObjectSchema.optional(),
  })
  .strict();
