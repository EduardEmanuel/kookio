import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { IngredientCatalogWhereUniqueInputObjectSchema as IngredientCatalogWhereUniqueInputObjectSchema } from './IngredientCatalogWhereUniqueInput.schema';
import { IngredientCatalogCreateWithoutRecipeIngredientsInputObjectSchema as IngredientCatalogCreateWithoutRecipeIngredientsInputObjectSchema } from './IngredientCatalogCreateWithoutRecipeIngredientsInput.schema';
import { IngredientCatalogUncheckedCreateWithoutRecipeIngredientsInputObjectSchema as IngredientCatalogUncheckedCreateWithoutRecipeIngredientsInputObjectSchema } from './IngredientCatalogUncheckedCreateWithoutRecipeIngredientsInput.schema';

const makeSchema = () =>
  z
    .object({
      where: z.lazy(() => IngredientCatalogWhereUniqueInputObjectSchema),
      create: z.union([
        z.lazy(
          () =>
            IngredientCatalogCreateWithoutRecipeIngredientsInputObjectSchema,
        ),
        z.lazy(
          () =>
            IngredientCatalogUncheckedCreateWithoutRecipeIngredientsInputObjectSchema,
        ),
      ]),
    })
    .strict();
export const IngredientCatalogCreateOrConnectWithoutRecipeIngredientsInputObjectSchema: z.ZodType<Prisma.IngredientCatalogCreateOrConnectWithoutRecipeIngredientsInput> =
  makeSchema() as unknown as z.ZodType<Prisma.IngredientCatalogCreateOrConnectWithoutRecipeIngredientsInput>;
export const IngredientCatalogCreateOrConnectWithoutRecipeIngredientsInputObjectZodSchema =
  makeSchema();
