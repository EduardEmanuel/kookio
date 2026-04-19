import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { IngredientCatalogCreateWithoutRecipeIngredientsInputObjectSchema as IngredientCatalogCreateWithoutRecipeIngredientsInputObjectSchema } from './IngredientCatalogCreateWithoutRecipeIngredientsInput.schema';
import { IngredientCatalogUncheckedCreateWithoutRecipeIngredientsInputObjectSchema as IngredientCatalogUncheckedCreateWithoutRecipeIngredientsInputObjectSchema } from './IngredientCatalogUncheckedCreateWithoutRecipeIngredientsInput.schema';
import { IngredientCatalogCreateOrConnectWithoutRecipeIngredientsInputObjectSchema as IngredientCatalogCreateOrConnectWithoutRecipeIngredientsInputObjectSchema } from './IngredientCatalogCreateOrConnectWithoutRecipeIngredientsInput.schema';
import { IngredientCatalogWhereUniqueInputObjectSchema as IngredientCatalogWhereUniqueInputObjectSchema } from './IngredientCatalogWhereUniqueInput.schema';

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
      connect: z
        .lazy(() => IngredientCatalogWhereUniqueInputObjectSchema)
        .optional(),
    })
    .strict();
export const IngredientCatalogCreateNestedOneWithoutRecipeIngredientsInputObjectSchema: z.ZodType<Prisma.IngredientCatalogCreateNestedOneWithoutRecipeIngredientsInput> =
  makeSchema() as unknown as z.ZodType<Prisma.IngredientCatalogCreateNestedOneWithoutRecipeIngredientsInput>;
export const IngredientCatalogCreateNestedOneWithoutRecipeIngredientsInputObjectZodSchema =
  makeSchema();
