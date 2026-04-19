import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { RecipeOrderByRelationAggregateInputObjectSchema as RecipeOrderByRelationAggregateInputObjectSchema } from './RecipeOrderByRelationAggregateInput.schema';

const makeSchema = () =>
  z
    .object({
      id: SortOrderSchema.optional(),
      externalId: SortOrderSchema.optional(),
      name: SortOrderSchema.optional(),
      imageUrl: z
        .union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)])
        .optional(),
      description: z
        .union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)])
        .optional(),
      createdAt: SortOrderSchema.optional(),
      recipes: z
        .lazy(() => RecipeOrderByRelationAggregateInputObjectSchema)
        .optional(),
    })
    .strict();
export const MealCategoryOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.MealCategoryOrderByWithRelationInput> =
  makeSchema() as unknown as z.ZodType<Prisma.MealCategoryOrderByWithRelationInput>;
export const MealCategoryOrderByWithRelationInputObjectZodSchema = makeSchema();
