import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { IngredientCatalogSelectObjectSchema as IngredientCatalogSelectObjectSchema } from './objects/IngredientCatalogSelect.schema';
import { IngredientCatalogIncludeObjectSchema as IngredientCatalogIncludeObjectSchema } from './objects/IngredientCatalogInclude.schema';
import { IngredientCatalogUpdateInputObjectSchema as IngredientCatalogUpdateInputObjectSchema } from './objects/IngredientCatalogUpdateInput.schema';
import { IngredientCatalogUncheckedUpdateInputObjectSchema as IngredientCatalogUncheckedUpdateInputObjectSchema } from './objects/IngredientCatalogUncheckedUpdateInput.schema';
import { IngredientCatalogWhereUniqueInputObjectSchema as IngredientCatalogWhereUniqueInputObjectSchema } from './objects/IngredientCatalogWhereUniqueInput.schema';

export const IngredientCatalogUpdateOneSchema: z.ZodType<Prisma.IngredientCatalogUpdateArgs> =
  z
    .object({
      select: IngredientCatalogSelectObjectSchema.optional(),
      include: IngredientCatalogIncludeObjectSchema.optional(),
      data: z.union([
        IngredientCatalogUpdateInputObjectSchema,
        IngredientCatalogUncheckedUpdateInputObjectSchema,
      ]),
      where: IngredientCatalogWhereUniqueInputObjectSchema,
    })
    .strict() as unknown as z.ZodType<Prisma.IngredientCatalogUpdateArgs>;

export const IngredientCatalogUpdateOneZodSchema = z
  .object({
    select: IngredientCatalogSelectObjectSchema.optional(),
    include: IngredientCatalogIncludeObjectSchema.optional(),
    data: z.union([
      IngredientCatalogUpdateInputObjectSchema,
      IngredientCatalogUncheckedUpdateInputObjectSchema,
    ]),
    where: IngredientCatalogWhereUniqueInputObjectSchema,
  })
  .strict();
