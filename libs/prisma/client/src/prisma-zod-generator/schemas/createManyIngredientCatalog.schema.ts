import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { IngredientCatalogCreateManyInputObjectSchema as IngredientCatalogCreateManyInputObjectSchema } from './objects/IngredientCatalogCreateManyInput.schema';

export const IngredientCatalogCreateManySchema: z.ZodType<Prisma.IngredientCatalogCreateManyArgs> =
  z
    .object({
      data: z.union([
        IngredientCatalogCreateManyInputObjectSchema,
        z.array(IngredientCatalogCreateManyInputObjectSchema),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict() as unknown as z.ZodType<Prisma.IngredientCatalogCreateManyArgs>;

export const IngredientCatalogCreateManyZodSchema = z
  .object({
    data: z.union([
      IngredientCatalogCreateManyInputObjectSchema,
      z.array(IngredientCatalogCreateManyInputObjectSchema),
    ]),
    skipDuplicates: z.boolean().optional(),
  })
  .strict();
