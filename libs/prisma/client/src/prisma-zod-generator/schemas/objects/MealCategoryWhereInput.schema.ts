import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { StringNullableFilterObjectSchema as StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { RecipeListRelationFilterObjectSchema as RecipeListRelationFilterObjectSchema } from './RecipeListRelationFilter.schema';

const mealcategorywhereinputSchema = z
  .object({
    AND: z
      .union([
        z.lazy(() => MealCategoryWhereInputObjectSchema),
        z.lazy(() => MealCategoryWhereInputObjectSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => MealCategoryWhereInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => MealCategoryWhereInputObjectSchema),
        z.lazy(() => MealCategoryWhereInputObjectSchema).array(),
      ])
      .optional(),
    id: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    externalId: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    name: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    imageUrl: z
      .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    description: z
      .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    createdAt: z
      .union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()])
      .optional(),
    recipes: z.lazy(() => RecipeListRelationFilterObjectSchema).optional(),
  })
  .strict();
export const MealCategoryWhereInputObjectSchema: z.ZodType<Prisma.MealCategoryWhereInput> =
  mealcategorywhereinputSchema as unknown as z.ZodType<Prisma.MealCategoryWhereInput>;
export const MealCategoryWhereInputObjectZodSchema =
  mealcategorywhereinputSchema;
