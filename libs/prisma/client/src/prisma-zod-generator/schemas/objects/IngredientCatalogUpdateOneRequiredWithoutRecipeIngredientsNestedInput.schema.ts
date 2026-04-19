import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { IngredientCatalogCreateWithoutRecipeIngredientsInputObjectSchema as IngredientCatalogCreateWithoutRecipeIngredientsInputObjectSchema } from './IngredientCatalogCreateWithoutRecipeIngredientsInput.schema';
import { IngredientCatalogUncheckedCreateWithoutRecipeIngredientsInputObjectSchema as IngredientCatalogUncheckedCreateWithoutRecipeIngredientsInputObjectSchema } from './IngredientCatalogUncheckedCreateWithoutRecipeIngredientsInput.schema';
import { IngredientCatalogCreateOrConnectWithoutRecipeIngredientsInputObjectSchema as IngredientCatalogCreateOrConnectWithoutRecipeIngredientsInputObjectSchema } from './IngredientCatalogCreateOrConnectWithoutRecipeIngredientsInput.schema';
import { IngredientCatalogUpsertWithoutRecipeIngredientsInputObjectSchema as IngredientCatalogUpsertWithoutRecipeIngredientsInputObjectSchema } from './IngredientCatalogUpsertWithoutRecipeIngredientsInput.schema';
import { IngredientCatalogWhereUniqueInputObjectSchema as IngredientCatalogWhereUniqueInputObjectSchema } from './IngredientCatalogWhereUniqueInput.schema';
import { IngredientCatalogUpdateToOneWithWhereWithoutRecipeIngredientsInputObjectSchema as IngredientCatalogUpdateToOneWithWhereWithoutRecipeIngredientsInputObjectSchema } from './IngredientCatalogUpdateToOneWithWhereWithoutRecipeIngredientsInput.schema';
import { IngredientCatalogUpdateWithoutRecipeIngredientsInputObjectSchema as IngredientCatalogUpdateWithoutRecipeIngredientsInputObjectSchema } from './IngredientCatalogUpdateWithoutRecipeIngredientsInput.schema';
import { IngredientCatalogUncheckedUpdateWithoutRecipeIngredientsInputObjectSchema as IngredientCatalogUncheckedUpdateWithoutRecipeIngredientsInputObjectSchema } from './IngredientCatalogUncheckedUpdateWithoutRecipeIngredientsInput.schema';

const makeSchema = () =>
  z
    .object({
      create: z
        .union([
          z.lazy(
            () =>
              IngredientCatalogCreateWithoutRecipeIngredientsInputObjectSchema,
          ),
          z.lazy(
            () =>
              IngredientCatalogUncheckedCreateWithoutRecipeIngredientsInputObjectSchema,
          ),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(
          () =>
            IngredientCatalogCreateOrConnectWithoutRecipeIngredientsInputObjectSchema,
        )
        .optional(),
      upsert: z
        .lazy(
          () =>
            IngredientCatalogUpsertWithoutRecipeIngredientsInputObjectSchema,
        )
        .optional(),
      connect: z
        .lazy(() => IngredientCatalogWhereUniqueInputObjectSchema)
        .optional(),
      update: z
        .union([
          z.lazy(
            () =>
              IngredientCatalogUpdateToOneWithWhereWithoutRecipeIngredientsInputObjectSchema,
          ),
          z.lazy(
            () =>
              IngredientCatalogUpdateWithoutRecipeIngredientsInputObjectSchema,
          ),
          z.lazy(
            () =>
              IngredientCatalogUncheckedUpdateWithoutRecipeIngredientsInputObjectSchema,
          ),
        ])
        .optional(),
    })
    .strict();
export const IngredientCatalogUpdateOneRequiredWithoutRecipeIngredientsNestedInputObjectSchema: z.ZodType<Prisma.IngredientCatalogUpdateOneRequiredWithoutRecipeIngredientsNestedInput> =
  makeSchema() as unknown as z.ZodType<Prisma.IngredientCatalogUpdateOneRequiredWithoutRecipeIngredientsNestedInput>;
export const IngredientCatalogUpdateOneRequiredWithoutRecipeIngredientsNestedInputObjectZodSchema =
  makeSchema();
