import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';

const makeSchema = () =>
  z
    .object({
      id: SortOrderSchema.optional(),
      userId: SortOrderSchema.optional(),
      recipeId: SortOrderSchema.optional(),
      servings: SortOrderSchema.optional(),
      completedAt: SortOrderSchema.optional(),
      createdAt: SortOrderSchema.optional(),
    })
    .strict();
export const CookingSessionMinOrderByAggregateInputObjectSchema: z.ZodType<Prisma.CookingSessionMinOrderByAggregateInput> =
  makeSchema() as unknown as z.ZodType<Prisma.CookingSessionMinOrderByAggregateInput>;
export const CookingSessionMinOrderByAggregateInputObjectZodSchema =
  makeSchema();
