import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RecipeStatusSchema } from '../enums/RecipeStatus.schema';
import { NestedIntFilterObjectSchema as NestedIntFilterObjectSchema } from './NestedIntFilter.schema';
import { NestedEnumRecipeStatusFilterObjectSchema as NestedEnumRecipeStatusFilterObjectSchema } from './NestedEnumRecipeStatusFilter.schema';

const nestedenumrecipestatuswithaggregatesfilterSchema = z
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
export const NestedEnumRecipeStatusWithAggregatesFilterObjectSchema: z.ZodType<Prisma.NestedEnumRecipeStatusWithAggregatesFilter> =
  nestedenumrecipestatuswithaggregatesfilterSchema as unknown as z.ZodType<Prisma.NestedEnumRecipeStatusWithAggregatesFilter>;
export const NestedEnumRecipeStatusWithAggregatesFilterObjectZodSchema =
  nestedenumrecipestatuswithaggregatesfilterSchema;
