import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';

const makeSchema = () =>
  z
    .object({
      _count: SortOrderSchema.optional(),
    })
    .strict();
export const RecipeCollectionEntryOrderByRelationAggregateInputObjectSchema: z.ZodType<Prisma.RecipeCollectionEntryOrderByRelationAggregateInput> =
  makeSchema() as unknown as z.ZodType<Prisma.RecipeCollectionEntryOrderByRelationAggregateInput>;
export const RecipeCollectionEntryOrderByRelationAggregateInputObjectZodSchema =
  makeSchema();
