import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { StringNullableFilterObjectSchema as StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { RecipeListRelationFilterObjectSchema as RecipeListRelationFilterObjectSchema } from './RecipeListRelationFilter.schema';

const mealareawhereinputSchema = z
  .object({
    AND: z
      .union([
        z.lazy(() => MealAreaWhereInputObjectSchema),
        z.lazy(() => MealAreaWhereInputObjectSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => MealAreaWhereInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => MealAreaWhereInputObjectSchema),
        z.lazy(() => MealAreaWhereInputObjectSchema).array(),
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
    flag: z
      .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    createdAt: z
      .union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()])
      .optional(),
    recipes: z.lazy(() => RecipeListRelationFilterObjectSchema).optional(),
  })
  .strict();
export const MealAreaWhereInputObjectSchema: z.ZodType<Prisma.MealAreaWhereInput> =
  mealareawhereinputSchema as unknown as z.ZodType<Prisma.MealAreaWhereInput>;
export const MealAreaWhereInputObjectZodSchema = mealareawhereinputSchema;
