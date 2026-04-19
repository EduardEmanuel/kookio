import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { IngredientCatalogCreateWithoutPantryItemsInputObjectSchema as IngredientCatalogCreateWithoutPantryItemsInputObjectSchema } from './IngredientCatalogCreateWithoutPantryItemsInput.schema';
import { IngredientCatalogUncheckedCreateWithoutPantryItemsInputObjectSchema as IngredientCatalogUncheckedCreateWithoutPantryItemsInputObjectSchema } from './IngredientCatalogUncheckedCreateWithoutPantryItemsInput.schema';
import { IngredientCatalogCreateOrConnectWithoutPantryItemsInputObjectSchema as IngredientCatalogCreateOrConnectWithoutPantryItemsInputObjectSchema } from './IngredientCatalogCreateOrConnectWithoutPantryItemsInput.schema';
import { IngredientCatalogWhereUniqueInputObjectSchema as IngredientCatalogWhereUniqueInputObjectSchema } from './IngredientCatalogWhereUniqueInput.schema';

const makeSchema = () =>
  z
    .object({
      create: z
        .union([
          z.lazy(
            () => IngredientCatalogCreateWithoutPantryItemsInputObjectSchema,
          ),
          z.lazy(
            () =>
              IngredientCatalogUncheckedCreateWithoutPantryItemsInputObjectSchema,
          ),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(
          () =>
            IngredientCatalogCreateOrConnectWithoutPantryItemsInputObjectSchema,
        )
        .optional(),
      connect: z
        .lazy(() => IngredientCatalogWhereUniqueInputObjectSchema)
        .optional(),
    })
    .strict();
export const IngredientCatalogCreateNestedOneWithoutPantryItemsInputObjectSchema: z.ZodType<Prisma.IngredientCatalogCreateNestedOneWithoutPantryItemsInput> =
  makeSchema() as unknown as z.ZodType<Prisma.IngredientCatalogCreateNestedOneWithoutPantryItemsInput>;
export const IngredientCatalogCreateNestedOneWithoutPantryItemsInputObjectZodSchema =
  makeSchema();
