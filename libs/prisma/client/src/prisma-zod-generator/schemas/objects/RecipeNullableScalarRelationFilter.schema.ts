import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RecipeWhereInputObjectSchema as RecipeWhereInputObjectSchema } from './RecipeWhereInput.schema';

const makeSchema = () =>
  z
    .object({
      is: z
        .lazy(() => RecipeWhereInputObjectSchema)
        .optional()
        .nullable(),
      isNot: z
        .lazy(() => RecipeWhereInputObjectSchema)
        .optional()
        .nullable(),
    })
    .strict();
export const RecipeNullableScalarRelationFilterObjectSchema: z.ZodType<Prisma.RecipeNullableScalarRelationFilter> =
  makeSchema() as unknown as z.ZodType<Prisma.RecipeNullableScalarRelationFilter>;
export const RecipeNullableScalarRelationFilterObjectZodSchema = makeSchema();
