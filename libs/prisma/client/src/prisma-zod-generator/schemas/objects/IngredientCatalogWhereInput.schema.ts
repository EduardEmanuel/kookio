import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { StringNullableFilterObjectSchema as StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { EnumIngredientCategoryNullableFilterObjectSchema as EnumIngredientCategoryNullableFilterObjectSchema } from './EnumIngredientCategoryNullableFilter.schema';
import { IngredientCategorySchema } from '../enums/IngredientCategory.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { RecipeIngredientListRelationFilterObjectSchema as RecipeIngredientListRelationFilterObjectSchema } from './RecipeIngredientListRelationFilter.schema';
import { PantryItemListRelationFilterObjectSchema as PantryItemListRelationFilterObjectSchema } from './PantryItemListRelationFilter.schema';

const ingredientcatalogwhereinputSchema = z
  .object({
    AND: z
      .union([
        z.lazy(() => IngredientCatalogWhereInputObjectSchema),
        z.lazy(() => IngredientCatalogWhereInputObjectSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => IngredientCatalogWhereInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => IngredientCatalogWhereInputObjectSchema),
        z.lazy(() => IngredientCatalogWhereInputObjectSchema).array(),
      ])
      .optional(),
    id: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    externalId: z
      .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    name: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    normalizedName: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    description: z
      .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    imageUrl: z
      .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    category: z
      .union([
        z.lazy(() => EnumIngredientCategoryNullableFilterObjectSchema),
        IngredientCategorySchema,
      ])
      .optional()
      .nullable(),
    createdAt: z
      .union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()])
      .optional(),
    updatedAt: z
      .union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()])
      .optional(),
    recipeIngredients: z
      .lazy(() => RecipeIngredientListRelationFilterObjectSchema)
      .optional(),
    pantryItems: z
      .lazy(() => PantryItemListRelationFilterObjectSchema)
      .optional(),
  })
  .strict();
export const IngredientCatalogWhereInputObjectSchema: z.ZodType<Prisma.IngredientCatalogWhereInput> =
  ingredientcatalogwhereinputSchema as unknown as z.ZodType<Prisma.IngredientCatalogWhereInput>;
export const IngredientCatalogWhereInputObjectZodSchema =
  ingredientcatalogwhereinputSchema;
