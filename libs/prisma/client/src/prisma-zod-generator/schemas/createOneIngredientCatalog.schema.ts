import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { IngredientCatalogSelectObjectSchema as IngredientCatalogSelectObjectSchema } from './objects/IngredientCatalogSelect.schema';
import { IngredientCatalogIncludeObjectSchema as IngredientCatalogIncludeObjectSchema } from './objects/IngredientCatalogInclude.schema';
import { IngredientCatalogCreateInputObjectSchema as IngredientCatalogCreateInputObjectSchema } from './objects/IngredientCatalogCreateInput.schema';
import { IngredientCatalogUncheckedCreateInputObjectSchema as IngredientCatalogUncheckedCreateInputObjectSchema } from './objects/IngredientCatalogUncheckedCreateInput.schema';

export const IngredientCatalogCreateOneSchema: z.ZodType<Prisma.IngredientCatalogCreateArgs> =
  z
    .object({
      select: IngredientCatalogSelectObjectSchema.optional(),
      include: IngredientCatalogIncludeObjectSchema.optional(),
      data: z.union([
        IngredientCatalogCreateInputObjectSchema,
        IngredientCatalogUncheckedCreateInputObjectSchema,
      ]),
    })
    .strict() as unknown as z.ZodType<Prisma.IngredientCatalogCreateArgs>;

export const IngredientCatalogCreateOneZodSchema = z
  .object({
    select: IngredientCatalogSelectObjectSchema.optional(),
    include: IngredientCatalogIncludeObjectSchema.optional(),
    data: z.union([
      IngredientCatalogCreateInputObjectSchema,
      IngredientCatalogUncheckedCreateInputObjectSchema,
    ]),
  })
  .strict();
