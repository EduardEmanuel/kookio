import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { FloatNullableFilterObjectSchema as FloatNullableFilterObjectSchema } from './FloatNullableFilter.schema';
import { EnumMeasureUnitNullableFilterObjectSchema as EnumMeasureUnitNullableFilterObjectSchema } from './EnumMeasureUnitNullableFilter.schema';
import { MeasureUnitSchema } from '../enums/MeasureUnit.schema';
import { StringNullableFilterObjectSchema as StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { RecipeScalarRelationFilterObjectSchema as RecipeScalarRelationFilterObjectSchema } from './RecipeScalarRelationFilter.schema';
import { RecipeWhereInputObjectSchema as RecipeWhereInputObjectSchema } from './RecipeWhereInput.schema';
import { IngredientCatalogScalarRelationFilterObjectSchema as IngredientCatalogScalarRelationFilterObjectSchema } from './IngredientCatalogScalarRelationFilter.schema';
import { IngredientCatalogWhereInputObjectSchema as IngredientCatalogWhereInputObjectSchema } from './IngredientCatalogWhereInput.schema';

const recipeingredientwhereinputSchema = z
  .object({
    AND: z
      .union([
        z.lazy(() => RecipeIngredientWhereInputObjectSchema),
        z.lazy(() => RecipeIngredientWhereInputObjectSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => RecipeIngredientWhereInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => RecipeIngredientWhereInputObjectSchema),
        z.lazy(() => RecipeIngredientWhereInputObjectSchema).array(),
      ])
      .optional(),
    id: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    recipeId: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    ingredientCatalogId: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    quantity: z
      .union([z.lazy(() => FloatNullableFilterObjectSchema), z.number()])
      .optional()
      .nullable(),
    unit: z
      .union([
        z.lazy(() => EnumMeasureUnitNullableFilterObjectSchema),
        MeasureUnitSchema,
      ])
      .optional()
      .nullable(),
    notes: z
      .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    recipe: z
      .union([
        z.lazy(() => RecipeScalarRelationFilterObjectSchema),
        z.lazy(() => RecipeWhereInputObjectSchema),
      ])
      .optional(),
    ingredient: z
      .union([
        z.lazy(() => IngredientCatalogScalarRelationFilterObjectSchema),
        z.lazy(() => IngredientCatalogWhereInputObjectSchema),
      ])
      .optional(),
  })
  .strict();
export const RecipeIngredientWhereInputObjectSchema: z.ZodType<Prisma.RecipeIngredientWhereInput> =
  recipeingredientwhereinputSchema as unknown as z.ZodType<Prisma.RecipeIngredientWhereInput>;
export const RecipeIngredientWhereInputObjectZodSchema =
  recipeingredientwhereinputSchema;
