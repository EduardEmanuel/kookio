import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';

const makeSchema = () =>
  z
    .object({
      id: SortOrderSchema.optional(),
      externalId: SortOrderSchema.optional(),
      name: SortOrderSchema.optional(),
      imageUrl: SortOrderSchema.optional(),
      description: SortOrderSchema.optional(),
      createdAt: SortOrderSchema.optional(),
    })
    .strict();
export const MealCategoryMinOrderByAggregateInputObjectSchema: z.ZodType<Prisma.MealCategoryMinOrderByAggregateInput> =
  makeSchema() as unknown as z.ZodType<Prisma.MealCategoryMinOrderByAggregateInput>;
export const MealCategoryMinOrderByAggregateInputObjectZodSchema = makeSchema();
