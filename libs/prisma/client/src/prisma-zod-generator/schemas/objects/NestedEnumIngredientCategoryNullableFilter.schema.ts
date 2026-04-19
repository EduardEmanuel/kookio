import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { IngredientCategorySchema } from '../enums/IngredientCategory.schema';

const nestedenumingredientcategorynullablefilterSchema = z
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
export const NestedEnumIngredientCategoryNullableFilterObjectSchema: z.ZodType<Prisma.NestedEnumIngredientCategoryNullableFilter> =
  nestedenumingredientcategorynullablefilterSchema as unknown as z.ZodType<Prisma.NestedEnumIngredientCategoryNullableFilter>;
export const NestedEnumIngredientCategoryNullableFilterObjectZodSchema =
  nestedenumingredientcategorynullablefilterSchema;
