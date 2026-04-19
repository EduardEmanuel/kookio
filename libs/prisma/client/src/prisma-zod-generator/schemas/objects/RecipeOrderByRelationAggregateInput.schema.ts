import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';

const makeSchema = () =>
  z
    .object({
      _count: SortOrderSchema.optional(),
    })
    .strict();
export const RecipeOrderByRelationAggregateInputObjectSchema: z.ZodType<Prisma.RecipeOrderByRelationAggregateInput> =
  makeSchema() as unknown as z.ZodType<Prisma.RecipeOrderByRelationAggregateInput>;
export const RecipeOrderByRelationAggregateInputObjectZodSchema = makeSchema();
