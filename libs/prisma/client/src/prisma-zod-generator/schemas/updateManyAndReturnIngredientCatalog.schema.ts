import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { IngredientCatalogSelectObjectSchema as IngredientCatalogSelectObjectSchema } from './objects/IngredientCatalogSelect.schema';
import { IngredientCatalogUpdateManyMutationInputObjectSchema as IngredientCatalogUpdateManyMutationInputObjectSchema } from './objects/IngredientCatalogUpdateManyMutationInput.schema';
import { IngredientCatalogWhereInputObjectSchema as IngredientCatalogWhereInputObjectSchema } from './objects/IngredientCatalogWhereInput.schema';

export const IngredientCatalogUpdateManyAndReturnSchema: z.ZodType<Prisma.IngredientCatalogUpdateManyAndReturnArgs> =
  z
    .object({
      select: IngredientCatalogSelectObjectSchema.optional(),
      data: IngredientCatalogUpdateManyMutationInputObjectSchema,
      where: IngredientCatalogWhereInputObjectSchema.optional(),
    })
    .strict() as unknown as z.ZodType<Prisma.IngredientCatalogUpdateManyAndReturnArgs>;

export const IngredientCatalogUpdateManyAndReturnZodSchema = z
  .object({
    select: IngredientCatalogSelectObjectSchema.optional(),
    data: IngredientCatalogUpdateManyMutationInputObjectSchema,
    where: IngredientCatalogWhereInputObjectSchema.optional(),
  })
  .strict();
