import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RecipeTagWhereInputObjectSchema as RecipeTagWhereInputObjectSchema } from './RecipeTagWhereInput.schema';

const makeSchema = () =>
  z
    .object({
      every: z.lazy(() => RecipeTagWhereInputObjectSchema).optional(),
      some: z.lazy(() => RecipeTagWhereInputObjectSchema).optional(),
      none: z.lazy(() => RecipeTagWhereInputObjectSchema).optional(),
    })
    .strict();
export const RecipeTagListRelationFilterObjectSchema: z.ZodType<Prisma.RecipeTagListRelationFilter> =
  makeSchema() as unknown as z.ZodType<Prisma.RecipeTagListRelationFilter>;
export const RecipeTagListRelationFilterObjectZodSchema = makeSchema();
