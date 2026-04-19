import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RecipeWhereInputObjectSchema as RecipeWhereInputObjectSchema } from './RecipeWhereInput.schema';

const makeSchema = () =>
  z
    .object({
      every: z.lazy(() => RecipeWhereInputObjectSchema).optional(),
      some: z.lazy(() => RecipeWhereInputObjectSchema).optional(),
      none: z.lazy(() => RecipeWhereInputObjectSchema).optional(),
    })
    .strict();
export const RecipeListRelationFilterObjectSchema: z.ZodType<Prisma.RecipeListRelationFilter> =
  makeSchema() as unknown as z.ZodType<Prisma.RecipeListRelationFilter>;
export const RecipeListRelationFilterObjectZodSchema = makeSchema();
