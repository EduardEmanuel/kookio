import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';

const recipetagscalarwhereinputSchema = z
  .object({
    AND: z
      .union([
        z.lazy(() => RecipeTagScalarWhereInputObjectSchema),
        z.lazy(() => RecipeTagScalarWhereInputObjectSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => RecipeTagScalarWhereInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => RecipeTagScalarWhereInputObjectSchema),
        z.lazy(() => RecipeTagScalarWhereInputObjectSchema).array(),
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
  })
  .strict();
export const RecipeTagScalarWhereInputObjectSchema: z.ZodType<Prisma.RecipeTagScalarWhereInput> =
  recipetagscalarwhereinputSchema as unknown as z.ZodType<Prisma.RecipeTagScalarWhereInput>;
export const RecipeTagScalarWhereInputObjectZodSchema =
  recipetagscalarwhereinputSchema;
