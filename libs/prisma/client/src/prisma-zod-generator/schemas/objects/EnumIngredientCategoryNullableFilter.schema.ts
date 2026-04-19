import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { IngredientCategorySchema } from '../enums/IngredientCategory.schema';
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
          z.lazy(() => NestedEnumIngredientCategoryNullableFilterObjectSchema),
        ])
        .optional()
        .nullable(),
    })
    .strict();
export const EnumIngredientCategoryNullableFilterObjectSchema: z.ZodType<Prisma.EnumIngredientCategoryNullableFilter> =
  makeSchema() as unknown as z.ZodType<Prisma.EnumIngredientCategoryNullableFilter>;
export const EnumIngredientCategoryNullableFilterObjectZodSchema = makeSchema();
