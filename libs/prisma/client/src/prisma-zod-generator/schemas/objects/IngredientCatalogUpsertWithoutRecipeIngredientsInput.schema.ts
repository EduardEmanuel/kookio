import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { IngredientCatalogUpdateWithoutRecipeIngredientsInputObjectSchema as IngredientCatalogUpdateWithoutRecipeIngredientsInputObjectSchema } from './IngredientCatalogUpdateWithoutRecipeIngredientsInput.schema';
import { IngredientCatalogUncheckedUpdateWithoutRecipeIngredientsInputObjectSchema as IngredientCatalogUncheckedUpdateWithoutRecipeIngredientsInputObjectSchema } from './IngredientCatalogUncheckedUpdateWithoutRecipeIngredientsInput.schema';
import { IngredientCatalogCreateWithoutRecipeIngredientsInputObjectSchema as IngredientCatalogCreateWithoutRecipeIngredientsInputObjectSchema } from './IngredientCatalogCreateWithoutRecipeIngredientsInput.schema';
import { IngredientCatalogUncheckedCreateWithoutRecipeIngredientsInputObjectSchema as IngredientCatalogUncheckedCreateWithoutRecipeIngredientsInputObjectSchema } from './IngredientCatalogUncheckedCreateWithoutRecipeIngredientsInput.schema';
import { IngredientCatalogWhereInputObjectSchema as IngredientCatalogWhereInputObjectSchema } from './IngredientCatalogWhereInput.schema';

const makeSchema = () =>
  z
    .object({
      update: z.union([
        z.lazy(
          () =>
            IngredientCatalogUpdateWithoutRecipeIngredientsInputObjectSchema,
        ),
        z.lazy(
          () =>
            IngredientCatalogUncheckedUpdateWithoutRecipeIngredientsInputObjectSchema,
        ),
      ]),
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
      where: z.lazy(() => IngredientCatalogWhereInputObjectSchema).optional(),
    })
    .strict();
export const IngredientCatalogUpsertWithoutRecipeIngredientsInputObjectSchema: z.ZodType<Prisma.IngredientCatalogUpsertWithoutRecipeIngredientsInput> =
  makeSchema() as unknown as z.ZodType<Prisma.IngredientCatalogUpsertWithoutRecipeIngredientsInput>;
export const IngredientCatalogUpsertWithoutRecipeIngredientsInputObjectZodSchema =
  makeSchema();
