import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RecipeWhereInputObjectSchema as RecipeWhereInputObjectSchema } from './RecipeWhereInput.schema';

const makeSchema = () =>
  z
    .object({
      is: z.lazy(() => RecipeWhereInputObjectSchema).optional(),
      isNot: z.lazy(() => RecipeWhereInputObjectSchema).optional(),
    })
    .strict();
export const RecipeScalarRelationFilterObjectSchema: z.ZodType<Prisma.RecipeScalarRelationFilter> =
  makeSchema() as unknown as z.ZodType<Prisma.RecipeScalarRelationFilter>;
export const RecipeScalarRelationFilterObjectZodSchema = makeSchema();
