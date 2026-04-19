import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RecipeCollectionWhereInputObjectSchema as RecipeCollectionWhereInputObjectSchema } from './RecipeCollectionWhereInput.schema';

const makeSchema = () =>
  z
    .object({
      is: z.lazy(() => RecipeCollectionWhereInputObjectSchema).optional(),
      isNot: z.lazy(() => RecipeCollectionWhereInputObjectSchema).optional(),
    })
    .strict();
export const RecipeCollectionScalarRelationFilterObjectSchema: z.ZodType<Prisma.RecipeCollectionScalarRelationFilter> =
  makeSchema() as unknown as z.ZodType<Prisma.RecipeCollectionScalarRelationFilter>;
export const RecipeCollectionScalarRelationFilterObjectZodSchema = makeSchema();
