import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringWithAggregatesFilterObjectSchema as StringWithAggregatesFilterObjectSchema } from './StringWithAggregatesFilter.schema';

const recipetagscalarwherewithaggregatesinputSchema = z
  .object({
    AND: z
      .union([
        z.lazy(() => RecipeTagScalarWhereWithAggregatesInputObjectSchema),
        z
          .lazy(() => RecipeTagScalarWhereWithAggregatesInputObjectSchema)
          .array(),
      ])
      .optional(),
    OR: z
      .lazy(() => RecipeTagScalarWhereWithAggregatesInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => RecipeTagScalarWhereWithAggregatesInputObjectSchema),
        z
          .lazy(() => RecipeTagScalarWhereWithAggregatesInputObjectSchema)
          .array(),
      ])
      .optional(),
    id: z
      .union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()])
      .optional(),
    recipeId: z
      .union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()])
      .optional(),
    tag: z
      .union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()])
      .optional(),
  })
  .strict();
export const RecipeTagScalarWhereWithAggregatesInputObjectSchema: z.ZodType<Prisma.RecipeTagScalarWhereWithAggregatesInput> =
  recipetagscalarwherewithaggregatesinputSchema as unknown as z.ZodType<Prisma.RecipeTagScalarWhereWithAggregatesInput>;
export const RecipeTagScalarWhereWithAggregatesInputObjectZodSchema =
  recipetagscalarwherewithaggregatesinputSchema;
