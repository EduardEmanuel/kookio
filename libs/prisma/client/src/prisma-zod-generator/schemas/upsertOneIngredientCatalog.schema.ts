import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { IngredientCatalogSelectObjectSchema as IngredientCatalogSelectObjectSchema } from './objects/IngredientCatalogSelect.schema';
import { IngredientCatalogIncludeObjectSchema as IngredientCatalogIncludeObjectSchema } from './objects/IngredientCatalogInclude.schema';
import { IngredientCatalogWhereUniqueInputObjectSchema as IngredientCatalogWhereUniqueInputObjectSchema } from './objects/IngredientCatalogWhereUniqueInput.schema';
import { IngredientCatalogCreateInputObjectSchema as IngredientCatalogCreateInputObjectSchema } from './objects/IngredientCatalogCreateInput.schema';
import { IngredientCatalogUncheckedCreateInputObjectSchema as IngredientCatalogUncheckedCreateInputObjectSchema } from './objects/IngredientCatalogUncheckedCreateInput.schema';
import { IngredientCatalogUpdateInputObjectSchema as IngredientCatalogUpdateInputObjectSchema } from './objects/IngredientCatalogUpdateInput.schema';
import { IngredientCatalogUncheckedUpdateInputObjectSchema as IngredientCatalogUncheckedUpdateInputObjectSchema } from './objects/IngredientCatalogUncheckedUpdateInput.schema';

export const IngredientCatalogUpsertOneSchema: z.ZodType<Prisma.IngredientCatalogUpsertArgs> =
  z
    .object({
      select: IngredientCatalogSelectObjectSchema.optional(),
      include: IngredientCatalogIncludeObjectSchema.optional(),
      where: IngredientCatalogWhereUniqueInputObjectSchema,
      create: z.union([
        IngredientCatalogCreateInputObjectSchema,
        IngredientCatalogUncheckedCreateInputObjectSchema,
      ]),
      update: z.union([
        IngredientCatalogUpdateInputObjectSchema,
        IngredientCatalogUncheckedUpdateInputObjectSchema,
      ]),
    })
    .strict() as unknown as z.ZodType<Prisma.IngredientCatalogUpsertArgs>;

export const IngredientCatalogUpsertOneZodSchema = z
  .object({
    select: IngredientCatalogSelectObjectSchema.optional(),
    include: IngredientCatalogIncludeObjectSchema.optional(),
    where: IngredientCatalogWhereUniqueInputObjectSchema,
    create: z.union([
      IngredientCatalogCreateInputObjectSchema,
      IngredientCatalogUncheckedCreateInputObjectSchema,
    ]),
    update: z.union([
      IngredientCatalogUpdateInputObjectSchema,
      IngredientCatalogUncheckedUpdateInputObjectSchema,
    ]),
  })
  .strict();
