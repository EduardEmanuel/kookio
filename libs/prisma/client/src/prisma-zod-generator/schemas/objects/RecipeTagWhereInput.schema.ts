import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { RecipeScalarRelationFilterObjectSchema as RecipeScalarRelationFilterObjectSchema } from './RecipeScalarRelationFilter.schema';
import { RecipeWhereInputObjectSchema as RecipeWhereInputObjectSchema } from './RecipeWhereInput.schema';

const recipetagwhereinputSchema = z
  .object({
    AND: z
      .union([
        z.lazy(() => RecipeTagWhereInputObjectSchema),
        z.lazy(() => RecipeTagWhereInputObjectSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => RecipeTagWhereInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => RecipeTagWhereInputObjectSchema),
        z.lazy(() => RecipeTagWhereInputObjectSchema).array(),
      ])
      .optional(),
    id: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    recipeId: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    tag: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    recipe: z
      .union([
        z.lazy(() => RecipeScalarRelationFilterObjectSchema),
        z.lazy(() => RecipeWhereInputObjectSchema),
      ])
      .optional(),
  })
  .strict();
export const RecipeTagWhereInputObjectSchema: z.ZodType<Prisma.RecipeTagWhereInput> =
  recipetagwhereinputSchema as unknown as z.ZodType<Prisma.RecipeTagWhereInput>;
export const RecipeTagWhereInputObjectZodSchema = recipetagwhereinputSchema;
