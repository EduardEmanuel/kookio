import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { MealCategoryWhereInputObjectSchema as MealCategoryWhereInputObjectSchema } from './MealCategoryWhereInput.schema';

const makeSchema = () =>
  z
    .object({
      is: z
        .lazy(() => MealCategoryWhereInputObjectSchema)
        .optional()
        .nullable(),
      isNot: z
        .lazy(() => MealCategoryWhereInputObjectSchema)
        .optional()
        .nullable(),
    })
    .strict();
export const MealCategoryNullableScalarRelationFilterObjectSchema: z.ZodType<Prisma.MealCategoryNullableScalarRelationFilter> =
  makeSchema() as unknown as z.ZodType<Prisma.MealCategoryNullableScalarRelationFilter>;
export const MealCategoryNullableScalarRelationFilterObjectZodSchema =
  makeSchema();
