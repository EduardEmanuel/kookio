import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { IngredientCatalogWhereInputObjectSchema as IngredientCatalogWhereInputObjectSchema } from './IngredientCatalogWhereInput.schema';
import { IngredientCatalogUpdateWithoutRecipeIngredientsInputObjectSchema as IngredientCatalogUpdateWithoutRecipeIngredientsInputObjectSchema } from './IngredientCatalogUpdateWithoutRecipeIngredientsInput.schema';
import { IngredientCatalogUncheckedUpdateWithoutRecipeIngredientsInputObjectSchema as IngredientCatalogUncheckedUpdateWithoutRecipeIngredientsInputObjectSchema } from './IngredientCatalogUncheckedUpdateWithoutRecipeIngredientsInput.schema';

const makeSchema = () =>
  z
    .object({
      where: z.lazy(() => IngredientCatalogWhereInputObjectSchema).optional(),
      data: z.union([
        z.lazy(
          () =>
            IngredientCatalogUpdateWithoutRecipeIngredientsInputObjectSchema,
        ),
        z.lazy(
          () =>
            IngredientCatalogUncheckedUpdateWithoutRecipeIngredientsInputObjectSchema,
        ),
      ]),
    })
    .strict();
export const IngredientCatalogUpdateToOneWithWhereWithoutRecipeIngredientsInputObjectSchema: z.ZodType<Prisma.IngredientCatalogUpdateToOneWithWhereWithoutRecipeIngredientsInput> =
  makeSchema() as unknown as z.ZodType<Prisma.IngredientCatalogUpdateToOneWithWhereWithoutRecipeIngredientsInput>;
export const IngredientCatalogUpdateToOneWithWhereWithoutRecipeIngredientsInputObjectZodSchema =
  makeSchema();
