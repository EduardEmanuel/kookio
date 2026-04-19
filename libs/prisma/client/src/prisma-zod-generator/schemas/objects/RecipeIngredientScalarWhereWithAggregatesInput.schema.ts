import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringWithAggregatesFilterObjectSchema as StringWithAggregatesFilterObjectSchema } from './StringWithAggregatesFilter.schema';
import { FloatNullableWithAggregatesFilterObjectSchema as FloatNullableWithAggregatesFilterObjectSchema } from './FloatNullableWithAggregatesFilter.schema';
import { EnumMeasureUnitNullableWithAggregatesFilterObjectSchema as EnumMeasureUnitNullableWithAggregatesFilterObjectSchema } from './EnumMeasureUnitNullableWithAggregatesFilter.schema';
import { MeasureUnitSchema } from '../enums/MeasureUnit.schema';
import { StringNullableWithAggregatesFilterObjectSchema as StringNullableWithAggregatesFilterObjectSchema } from './StringNullableWithAggregatesFilter.schema';

const recipeingredientscalarwherewithaggregatesinputSchema = z
  .object({
    AND: z
      .union([
        z.lazy(
          () => RecipeIngredientScalarWhereWithAggregatesInputObjectSchema,
        ),
        z
          .lazy(
            () => RecipeIngredientScalarWhereWithAggregatesInputObjectSchema,
          )
          .array(),
      ])
      .optional(),
    OR: z
      .lazy(() => RecipeIngredientScalarWhereWithAggregatesInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(
          () => RecipeIngredientScalarWhereWithAggregatesInputObjectSchema,
        ),
        z
          .lazy(
            () => RecipeIngredientScalarWhereWithAggregatesInputObjectSchema,
          )
          .array(),
      ])
      .optional(),
    id: z
      .union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()])
      .optional(),
    recipeId: z
      .union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()])
      .optional(),
    ingredientCatalogId: z
      .union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()])
      .optional(),
    quantity: z
      .union([
        z.lazy(() => FloatNullableWithAggregatesFilterObjectSchema),
        z.number(),
      ])
      .optional()
      .nullable(),
    unit: z
      .union([
        z.lazy(() => EnumMeasureUnitNullableWithAggregatesFilterObjectSchema),
        MeasureUnitSchema,
      ])
      .optional()
      .nullable(),
    notes: z
      .union([
        z.lazy(() => StringNullableWithAggregatesFilterObjectSchema),
        z.string(),
      ])
      .optional()
      .nullable(),
  })
  .strict();
export const RecipeIngredientScalarWhereWithAggregatesInputObjectSchema: z.ZodType<Prisma.RecipeIngredientScalarWhereWithAggregatesInput> =
  recipeingredientscalarwherewithaggregatesinputSchema as unknown as z.ZodType<Prisma.RecipeIngredientScalarWhereWithAggregatesInput>;
export const RecipeIngredientScalarWhereWithAggregatesInputObjectZodSchema =
  recipeingredientscalarwherewithaggregatesinputSchema;
