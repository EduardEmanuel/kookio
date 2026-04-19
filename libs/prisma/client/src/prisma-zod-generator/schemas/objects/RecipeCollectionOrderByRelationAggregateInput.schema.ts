import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';

const makeSchema = () =>
  z
    .object({
      _count: SortOrderSchema.optional(),
    })
    .strict();
export const RecipeCollectionOrderByRelationAggregateInputObjectSchema: z.ZodType<Prisma.RecipeCollectionOrderByRelationAggregateInput> =
  makeSchema() as unknown as z.ZodType<Prisma.RecipeCollectionOrderByRelationAggregateInput>;
export const RecipeCollectionOrderByRelationAggregateInputObjectZodSchema =
  makeSchema();
