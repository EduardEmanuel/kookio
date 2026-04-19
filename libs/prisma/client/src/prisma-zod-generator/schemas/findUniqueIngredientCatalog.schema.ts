import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { IngredientCatalogSelectObjectSchema as IngredientCatalogSelectObjectSchema } from './objects/IngredientCatalogSelect.schema';
import { IngredientCatalogIncludeObjectSchema as IngredientCatalogIncludeObjectSchema } from './objects/IngredientCatalogInclude.schema';
import { IngredientCatalogWhereUniqueInputObjectSchema as IngredientCatalogWhereUniqueInputObjectSchema } from './objects/IngredientCatalogWhereUniqueInput.schema';

export const IngredientCatalogFindUniqueSchema: z.ZodType<Prisma.IngredientCatalogFindUniqueArgs> =
  z
    .object({
      select: IngredientCatalogSelectObjectSchema.optional(),
      include: IngredientCatalogIncludeObjectSchema.optional(),
      where: IngredientCatalogWhereUniqueInputObjectSchema,
    })
    .strict() as unknown as z.ZodType<Prisma.IngredientCatalogFindUniqueArgs>;

export const IngredientCatalogFindUniqueZodSchema = z
  .object({
    select: IngredientCatalogSelectObjectSchema.optional(),
    include: IngredientCatalogIncludeObjectSchema.optional(),
    where: IngredientCatalogWhereUniqueInputObjectSchema,
  })
  .strict();
