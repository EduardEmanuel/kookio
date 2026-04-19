import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { MealAreaWhereInputObjectSchema as MealAreaWhereInputObjectSchema } from './MealAreaWhereInput.schema';

const makeSchema = () =>
  z
    .object({
      is: z
        .lazy(() => MealAreaWhereInputObjectSchema)
        .optional()
        .nullable(),
      isNot: z
        .lazy(() => MealAreaWhereInputObjectSchema)
        .optional()
        .nullable(),
    })
    .strict();
export const MealAreaNullableScalarRelationFilterObjectSchema: z.ZodType<Prisma.MealAreaNullableScalarRelationFilter> =
  makeSchema() as unknown as z.ZodType<Prisma.MealAreaNullableScalarRelationFilter>;
export const MealAreaNullableScalarRelationFilterObjectZodSchema = makeSchema();
