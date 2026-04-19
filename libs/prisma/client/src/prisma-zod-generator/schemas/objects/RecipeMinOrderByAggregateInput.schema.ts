import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';

const makeSchema = () =>
  z
    .object({
      id: SortOrderSchema.optional(),
      externalId: SortOrderSchema.optional(),
      slug: SortOrderSchema.optional(),
      title: SortOrderSchema.optional(),
      description: SortOrderSchema.optional(),
      imageUrl: SortOrderSchema.optional(),
      youtubeUrl: SortOrderSchema.optional(),
      sourceUrl: SortOrderSchema.optional(),
      instructions: SortOrderSchema.optional(),
      status: SortOrderSchema.optional(),
      servings: SortOrderSchema.optional(),
      prepTimeMinutes: SortOrderSchema.optional(),
      cookTimeMinutes: SortOrderSchema.optional(),
      categoryId: SortOrderSchema.optional(),
      areaId: SortOrderSchema.optional(),
      authorId: SortOrderSchema.optional(),
      createdAt: SortOrderSchema.optional(),
      updatedAt: SortOrderSchema.optional(),
    })
    .strict();
export const RecipeMinOrderByAggregateInputObjectSchema: z.ZodType<Prisma.RecipeMinOrderByAggregateInput> =
  makeSchema() as unknown as z.ZodType<Prisma.RecipeMinOrderByAggregateInput>;
export const RecipeMinOrderByAggregateInputObjectZodSchema = makeSchema();
