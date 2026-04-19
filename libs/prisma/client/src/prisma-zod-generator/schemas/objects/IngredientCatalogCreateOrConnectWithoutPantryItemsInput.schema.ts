import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { IngredientCatalogWhereUniqueInputObjectSchema as IngredientCatalogWhereUniqueInputObjectSchema } from './IngredientCatalogWhereUniqueInput.schema';
import { IngredientCatalogCreateWithoutPantryItemsInputObjectSchema as IngredientCatalogCreateWithoutPantryItemsInputObjectSchema } from './IngredientCatalogCreateWithoutPantryItemsInput.schema';
import { IngredientCatalogUncheckedCreateWithoutPantryItemsInputObjectSchema as IngredientCatalogUncheckedCreateWithoutPantryItemsInputObjectSchema } from './IngredientCatalogUncheckedCreateWithoutPantryItemsInput.schema';

const makeSchema = () =>
  z
    .object({
      where: z.lazy(() => IngredientCatalogWhereUniqueInputObjectSchema),
      create: z.union([
        z.lazy(
          () => IngredientCatalogCreateWithoutPantryItemsInputObjectSchema,
        ),
        z.lazy(
          () =>
            IngredientCatalogUncheckedCreateWithoutPantryItemsInputObjectSchema,
        ),
      ]),
    })
    .strict();
export const IngredientCatalogCreateOrConnectWithoutPantryItemsInputObjectSchema: z.ZodType<Prisma.IngredientCatalogCreateOrConnectWithoutPantryItemsInput> =
  makeSchema() as unknown as z.ZodType<Prisma.IngredientCatalogCreateOrConnectWithoutPantryItemsInput>;
export const IngredientCatalogCreateOrConnectWithoutPantryItemsInputObjectZodSchema =
  makeSchema();
