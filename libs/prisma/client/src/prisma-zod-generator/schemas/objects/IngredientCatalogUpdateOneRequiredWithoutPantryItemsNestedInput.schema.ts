import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { IngredientCatalogCreateWithoutPantryItemsInputObjectSchema as IngredientCatalogCreateWithoutPantryItemsInputObjectSchema } from './IngredientCatalogCreateWithoutPantryItemsInput.schema';
import { IngredientCatalogUncheckedCreateWithoutPantryItemsInputObjectSchema as IngredientCatalogUncheckedCreateWithoutPantryItemsInputObjectSchema } from './IngredientCatalogUncheckedCreateWithoutPantryItemsInput.schema';
import { IngredientCatalogCreateOrConnectWithoutPantryItemsInputObjectSchema as IngredientCatalogCreateOrConnectWithoutPantryItemsInputObjectSchema } from './IngredientCatalogCreateOrConnectWithoutPantryItemsInput.schema';
import { IngredientCatalogUpsertWithoutPantryItemsInputObjectSchema as IngredientCatalogUpsertWithoutPantryItemsInputObjectSchema } from './IngredientCatalogUpsertWithoutPantryItemsInput.schema';
import { IngredientCatalogWhereUniqueInputObjectSchema as IngredientCatalogWhereUniqueInputObjectSchema } from './IngredientCatalogWhereUniqueInput.schema';
import { IngredientCatalogUpdateToOneWithWhereWithoutPantryItemsInputObjectSchema as IngredientCatalogUpdateToOneWithWhereWithoutPantryItemsInputObjectSchema } from './IngredientCatalogUpdateToOneWithWhereWithoutPantryItemsInput.schema';
import { IngredientCatalogUpdateWithoutPantryItemsInputObjectSchema as IngredientCatalogUpdateWithoutPantryItemsInputObjectSchema } from './IngredientCatalogUpdateWithoutPantryItemsInput.schema';
import { IngredientCatalogUncheckedUpdateWithoutPantryItemsInputObjectSchema as IngredientCatalogUncheckedUpdateWithoutPantryItemsInputObjectSchema } from './IngredientCatalogUncheckedUpdateWithoutPantryItemsInput.schema';

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
      upsert: z
        .lazy(() => IngredientCatalogUpsertWithoutPantryItemsInputObjectSchema)
        .optional(),
      connect: z
        .lazy(() => IngredientCatalogWhereUniqueInputObjectSchema)
        .optional(),
      update: z
        .union([
          z.lazy(
            () =>
              IngredientCatalogUpdateToOneWithWhereWithoutPantryItemsInputObjectSchema,
          ),
          z.lazy(
            () => IngredientCatalogUpdateWithoutPantryItemsInputObjectSchema,
          ),
          z.lazy(
            () =>
              IngredientCatalogUncheckedUpdateWithoutPantryItemsInputObjectSchema,
          ),
        ])
        .optional(),
    })
    .strict();
export const IngredientCatalogUpdateOneRequiredWithoutPantryItemsNestedInputObjectSchema: z.ZodType<Prisma.IngredientCatalogUpdateOneRequiredWithoutPantryItemsNestedInput> =
  makeSchema() as unknown as z.ZodType<Prisma.IngredientCatalogUpdateOneRequiredWithoutPantryItemsNestedInput>;
export const IngredientCatalogUpdateOneRequiredWithoutPantryItemsNestedInputObjectZodSchema =
  makeSchema();
