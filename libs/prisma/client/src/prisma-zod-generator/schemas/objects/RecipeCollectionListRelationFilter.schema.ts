import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RecipeCollectionWhereInputObjectSchema as RecipeCollectionWhereInputObjectSchema } from './RecipeCollectionWhereInput.schema';

const makeSchema = () =>
  z
    .object({
      every: z.lazy(() => RecipeCollectionWhereInputObjectSchema).optional(),
      some: z.lazy(() => RecipeCollectionWhereInputObjectSchema).optional(),
      none: z.lazy(() => RecipeCollectionWhereInputObjectSchema).optional(),
    })
    .strict();
export const RecipeCollectionListRelationFilterObjectSchema: z.ZodType<Prisma.RecipeCollectionListRelationFilter> =
  makeSchema() as unknown as z.ZodType<Prisma.RecipeCollectionListRelationFilter>;
export const RecipeCollectionListRelationFilterObjectZodSchema = makeSchema();
