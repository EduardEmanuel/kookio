import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { IngredientCatalogWhereInputObjectSchema as IngredientCatalogWhereInputObjectSchema } from './IngredientCatalogWhereInput.schema';
import { IngredientCatalogUpdateWithoutPantryItemsInputObjectSchema as IngredientCatalogUpdateWithoutPantryItemsInputObjectSchema } from './IngredientCatalogUpdateWithoutPantryItemsInput.schema';
import { IngredientCatalogUncheckedUpdateWithoutPantryItemsInputObjectSchema as IngredientCatalogUncheckedUpdateWithoutPantryItemsInputObjectSchema } from './IngredientCatalogUncheckedUpdateWithoutPantryItemsInput.schema';

const makeSchema = () =>
  z
    .object({
      where: z.lazy(() => IngredientCatalogWhereInputObjectSchema).optional(),
      data: z.union([
        z.lazy(
          () => IngredientCatalogUpdateWithoutPantryItemsInputObjectSchema,
        ),
        z.lazy(
          () =>
            IngredientCatalogUncheckedUpdateWithoutPantryItemsInputObjectSchema,
        ),
      ]),
    })
    .strict();
export const IngredientCatalogUpdateToOneWithWhereWithoutPantryItemsInputObjectSchema: z.ZodType<Prisma.IngredientCatalogUpdateToOneWithWhereWithoutPantryItemsInput> =
  makeSchema() as unknown as z.ZodType<Prisma.IngredientCatalogUpdateToOneWithWhereWithoutPantryItemsInput>;
export const IngredientCatalogUpdateToOneWithWhereWithoutPantryItemsInputObjectZodSchema =
  makeSchema();
