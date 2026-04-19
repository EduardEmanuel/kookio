import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RecipeStatusSchema } from '../enums/RecipeStatus.schema';
import { NestedEnumRecipeStatusWithAggregatesFilterObjectSchema as NestedEnumRecipeStatusWithAggregatesFilterObjectSchema } from './NestedEnumRecipeStatusWithAggregatesFilter.schema';
import { NestedIntFilterObjectSchema as NestedIntFilterObjectSchema } from './NestedIntFilter.schema';
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
          z.lazy(() => NestedEnumRecipeStatusWithAggregatesFilterObjectSchema),
        ])
        .optional(),
      _count: z.lazy(() => NestedIntFilterObjectSchema).optional(),
      _min: z.lazy(() => NestedEnumRecipeStatusFilterObjectSchema).optional(),
      _max: z.lazy(() => NestedEnumRecipeStatusFilterObjectSchema).optional(),
    })
    .strict();
export const EnumRecipeStatusWithAggregatesFilterObjectSchema: z.ZodType<Prisma.EnumRecipeStatusWithAggregatesFilter> =
  makeSchema() as unknown as z.ZodType<Prisma.EnumRecipeStatusWithAggregatesFilter>;
export const EnumRecipeStatusWithAggregatesFilterObjectZodSchema = makeSchema();
