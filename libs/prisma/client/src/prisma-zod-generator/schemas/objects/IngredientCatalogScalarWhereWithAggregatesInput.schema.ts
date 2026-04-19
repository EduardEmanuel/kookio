import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringWithAggregatesFilterObjectSchema as StringWithAggregatesFilterObjectSchema } from './StringWithAggregatesFilter.schema';
import { StringNullableWithAggregatesFilterObjectSchema as StringNullableWithAggregatesFilterObjectSchema } from './StringNullableWithAggregatesFilter.schema';
import { EnumIngredientCategoryNullableWithAggregatesFilterObjectSchema as EnumIngredientCategoryNullableWithAggregatesFilterObjectSchema } from './EnumIngredientCategoryNullableWithAggregatesFilter.schema';
import { IngredientCategorySchema } from '../enums/IngredientCategory.schema';
import { DateTimeWithAggregatesFilterObjectSchema as DateTimeWithAggregatesFilterObjectSchema } from './DateTimeWithAggregatesFilter.schema';

const ingredientcatalogscalarwherewithaggregatesinputSchema = z
  .object({
    AND: z
      .union([
        z.lazy(
          () => IngredientCatalogScalarWhereWithAggregatesInputObjectSchema,
        ),
        z
          .lazy(
            () => IngredientCatalogScalarWhereWithAggregatesInputObjectSchema,
          )
          .array(),
      ])
      .optional(),
    OR: z
      .lazy(() => IngredientCatalogScalarWhereWithAggregatesInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(
          () => IngredientCatalogScalarWhereWithAggregatesInputObjectSchema,
        ),
        z
          .lazy(
            () => IngredientCatalogScalarWhereWithAggregatesInputObjectSchema,
          )
          .array(),
      ])
      .optional(),
    id: z
      .union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()])
      .optional(),
    externalId: z
      .union([
        z.lazy(() => StringNullableWithAggregatesFilterObjectSchema),
        z.string(),
      ])
      .optional()
      .nullable(),
    name: z
      .union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()])
      .optional(),
    normalizedName: z
      .union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()])
      .optional(),
    description: z
      .union([
        z.lazy(() => StringNullableWithAggregatesFilterObjectSchema),
        z.string(),
      ])
      .optional()
      .nullable(),
    imageUrl: z
      .union([
        z.lazy(() => StringNullableWithAggregatesFilterObjectSchema),
        z.string(),
      ])
      .optional()
      .nullable(),
    category: z
      .union([
        z.lazy(
          () => EnumIngredientCategoryNullableWithAggregatesFilterObjectSchema,
        ),
        IngredientCategorySchema,
      ])
      .optional()
      .nullable(),
    createdAt: z
      .union([
        z.lazy(() => DateTimeWithAggregatesFilterObjectSchema),
        z.coerce.date(),
      ])
      .optional(),
    updatedAt: z
      .union([
        z.lazy(() => DateTimeWithAggregatesFilterObjectSchema),
        z.coerce.date(),
      ])
      .optional(),
  })
  .strict();
export const IngredientCatalogScalarWhereWithAggregatesInputObjectSchema: z.ZodType<Prisma.IngredientCatalogScalarWhereWithAggregatesInput> =
  ingredientcatalogscalarwherewithaggregatesinputSchema as unknown as z.ZodType<Prisma.IngredientCatalogScalarWhereWithAggregatesInput>;
export const IngredientCatalogScalarWhereWithAggregatesInputObjectZodSchema =
  ingredientcatalogscalarwherewithaggregatesinputSchema;
