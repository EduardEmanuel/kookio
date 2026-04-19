import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { IngredientCategorySchema } from '../enums/IngredientCategory.schema';
import { NestedIntNullableFilterObjectSchema as NestedIntNullableFilterObjectSchema } from './NestedIntNullableFilter.schema';
import { NestedEnumIngredientCategoryNullableFilterObjectSchema as NestedEnumIngredientCategoryNullableFilterObjectSchema } from './NestedEnumIngredientCategoryNullableFilter.schema';

const nestedenumingredientcategorynullablewithaggregatesfilterSchema = z
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
export const NestedEnumIngredientCategoryNullableWithAggregatesFilterObjectSchema: z.ZodType<Prisma.NestedEnumIngredientCategoryNullableWithAggregatesFilter> =
  nestedenumingredientcategorynullablewithaggregatesfilterSchema as unknown as z.ZodType<Prisma.NestedEnumIngredientCategoryNullableWithAggregatesFilter>;
export const NestedEnumIngredientCategoryNullableWithAggregatesFilterObjectZodSchema =
  nestedenumingredientcategorynullablewithaggregatesfilterSchema;
