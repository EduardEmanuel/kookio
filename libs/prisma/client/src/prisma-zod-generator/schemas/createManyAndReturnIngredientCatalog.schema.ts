import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { IngredientCatalogSelectObjectSchema as IngredientCatalogSelectObjectSchema } from './objects/IngredientCatalogSelect.schema';
import { IngredientCatalogCreateManyInputObjectSchema as IngredientCatalogCreateManyInputObjectSchema } from './objects/IngredientCatalogCreateManyInput.schema';

export const IngredientCatalogCreateManyAndReturnSchema: z.ZodType<Prisma.IngredientCatalogCreateManyAndReturnArgs> =
  z
    .object({
      select: IngredientCatalogSelectObjectSchema.optional(),
      data: z.union([
        IngredientCatalogCreateManyInputObjectSchema,
        z.array(IngredientCatalogCreateManyInputObjectSchema),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict() as unknown as z.ZodType<Prisma.IngredientCatalogCreateManyAndReturnArgs>;

export const IngredientCatalogCreateManyAndReturnZodSchema = z
  .object({
    select: IngredientCatalogSelectObjectSchema.optional(),
    data: z.union([
      IngredientCatalogCreateManyInputObjectSchema,
      z.array(IngredientCatalogCreateManyInputObjectSchema),
    ]),
    skipDuplicates: z.boolean().optional(),
  })
  .strict();
