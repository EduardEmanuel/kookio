import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';

const makeSchema = () =>
  z
    .object({
      _count: SortOrderSchema.optional(),
    })
    .strict();
export const RecipeTagOrderByRelationAggregateInputObjectSchema: z.ZodType<Prisma.RecipeTagOrderByRelationAggregateInput> =
  makeSchema() as unknown as z.ZodType<Prisma.RecipeTagOrderByRelationAggregateInput>;
export const RecipeTagOrderByRelationAggregateInputObjectZodSchema =
  makeSchema();
