import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { IngredientCatalogUpdateWithoutPantryItemsInputObjectSchema as IngredientCatalogUpdateWithoutPantryItemsInputObjectSchema } from './IngredientCatalogUpdateWithoutPantryItemsInput.schema';
import { IngredientCatalogUncheckedUpdateWithoutPantryItemsInputObjectSchema as IngredientCatalogUncheckedUpdateWithoutPantryItemsInputObjectSchema } from './IngredientCatalogUncheckedUpdateWithoutPantryItemsInput.schema';
import { IngredientCatalogCreateWithoutPantryItemsInputObjectSchema as IngredientCatalogCreateWithoutPantryItemsInputObjectSchema } from './IngredientCatalogCreateWithoutPantryItemsInput.schema';
import { IngredientCatalogUncheckedCreateWithoutPantryItemsInputObjectSchema as IngredientCatalogUncheckedCreateWithoutPantryItemsInputObjectSchema } from './IngredientCatalogUncheckedCreateWithoutPantryItemsInput.schema';
import { IngredientCatalogWhereInputObjectSchema as IngredientCatalogWhereInputObjectSchema } from './IngredientCatalogWhereInput.schema';

const makeSchema = () =>
  z
    .object({
      update: z.union([
        z.lazy(
          () => IngredientCatalogUpdateWithoutPantryItemsInputObjectSchema,
        ),
        z.lazy(
          () =>
            IngredientCatalogUncheckedUpdateWithoutPantryItemsInputObjectSchema,
        ),
      ]),
      create: z.union([
        z.lazy(
          () => IngredientCatalogCreateWithoutPantryItemsInputObjectSchema,
        ),
        z.lazy(
          () =>
            IngredientCatalogUncheckedCreateWithoutPantryItemsInputObjectSchema,
        ),
      ]),
      where: z.lazy(() => IngredientCatalogWhereInputObjectSchema).optional(),
    })
    .strict();
export const IngredientCatalogUpsertWithoutPantryItemsInputObjectSchema: z.ZodType<Prisma.IngredientCatalogUpsertWithoutPantryItemsInput> =
  makeSchema() as unknown as z.ZodType<Prisma.IngredientCatalogUpsertWithoutPantryItemsInput>;
export const IngredientCatalogUpsertWithoutPantryItemsInputObjectZodSchema =
  makeSchema();
