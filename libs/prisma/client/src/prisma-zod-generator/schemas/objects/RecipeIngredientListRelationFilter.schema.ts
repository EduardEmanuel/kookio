import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RecipeIngredientWhereInputObjectSchema as RecipeIngredientWhereInputObjectSchema } from './RecipeIngredientWhereInput.schema';

const makeSchema = () =>
  z
    .object({
      every: z.lazy(() => RecipeIngredientWhereInputObjectSchema).optional(),
      some: z.lazy(() => RecipeIngredientWhereInputObjectSchema).optional(),
      none: z.lazy(() => RecipeIngredientWhereInputObjectSchema).optional(),
    })
    .strict();
export const RecipeIngredientListRelationFilterObjectSchema: z.ZodType<Prisma.RecipeIngredientListRelationFilter> =
  makeSchema() as unknown as z.ZodType<Prisma.RecipeIngredientListRelationFilter>;
export const RecipeIngredientListRelationFilterObjectZodSchema = makeSchema();
