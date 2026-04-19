import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RecipeStatusSchema } from '../enums/RecipeStatus.schema';
import { NestedEnumRecipeStatusFilterObjectSchema as NestedEnumRecipeStatusFilterObjectSchema } from './NestedEnumRecipeStatusFilter.schema';

const makeSchema = () =>
  z
    .object({
      equals: RecipeStatusSchema.optional(),
      in: RecipeStatusSchema.array().optional(),
      notIn: RecipeStatusSchema.array().optional(),
      not: z
        .union([
          RecipeStatusSchema,
          z.lazy(() => NestedEnumRecipeStatusFilterObjectSchema),
        ])
        .optional(),
    })
    .strict();
export const EnumRecipeStatusFilterObjectSchema: z.ZodType<Prisma.EnumRecipeStatusFilter> =
  makeSchema() as unknown as z.ZodType<Prisma.EnumRecipeStatusFilter>;
export const EnumRecipeStatusFilterObjectZodSchema = makeSchema();
