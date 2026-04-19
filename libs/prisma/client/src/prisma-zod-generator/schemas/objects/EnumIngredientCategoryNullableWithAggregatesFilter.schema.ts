import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { IngredientCategorySchema } from '../enums/IngredientCategory.schema';
import { NestedEnumIngredientCategoryNullableWithAggregatesFilterObjectSchema as NestedEnumIngredientCategoryNullableWithAggregatesFilterObjectSchema } from './NestedEnumIngredientCategoryNullableWithAggregatesFilter.schema';
import { NestedIntNullableFilterObjectSchema as NestedIntNullableFilterObjectSchema } from './NestedIntNullableFilter.schema';
import { NestedEnumIngredientCategoryNullableFilterObjectSchema as NestedEnumIngredientCategoryNullableFilterObjectSchema } from './NestedEnumIngredientCategoryNullableFilter.schema';

const makeSchema = () =>
  z
    .object({
      equals: IngredientCategorySchema.optional().nullable(),
      in: IngredientCategorySchema.array().optional().nullable(),
      notIn: IngredientCategorySchema.array().optional().nullable(),
      not: z
        .union([
          IngredientCategorySchema,
          z.lazy(
            () =>
              NestedEnumIngredientCategoryNullableWithAggregatesFilterObjectSchema,
          ),
        ])
        .optional()
        .nullable(),
      _count: z.lazy(() => NestedIntNullableFilterObjectSchema).optional(),
      _min: z
        .lazy(() => NestedEnumIngredientCategoryNullableFilterObjectSchema)
        .optional(),
      _max: z
        .lazy(() => NestedEnumIngredientCategoryNullableFilterObjectSchema)
        .optional(),
    })
    .strict();
export const EnumIngredientCategoryNullableWithAggregatesFilterObjectSchema: z.ZodType<Prisma.EnumIngredientCategoryNullableWithAggregatesFilter> =
  makeSchema() as unknown as z.ZodType<Prisma.EnumIngredientCategoryNullableWithAggregatesFilter>;
export const EnumIngredientCategoryNullableWithAggregatesFilterObjectZodSchema =
  makeSchema();
