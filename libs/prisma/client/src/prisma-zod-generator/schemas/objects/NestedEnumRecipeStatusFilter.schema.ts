import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RecipeStatusSchema } from '../enums/RecipeStatus.schema';

const nestedenumrecipestatusfilterSchema = z
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
export const NestedEnumRecipeStatusFilterObjectSchema: z.ZodType<Prisma.NestedEnumRecipeStatusFilter> =
  nestedenumrecipestatusfilterSchema as unknown as z.ZodType<Prisma.NestedEnumRecipeStatusFilter>;
export const NestedEnumRecipeStatusFilterObjectZodSchema =
  nestedenumrecipestatusfilterSchema;
