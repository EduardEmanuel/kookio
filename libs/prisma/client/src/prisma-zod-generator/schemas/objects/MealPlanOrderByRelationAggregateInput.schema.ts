import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';

const makeSchema = () =>
  z
    .object({
      _count: SortOrderSchema.optional(),
    })
    .strict();
export const MealPlanOrderByRelationAggregateInputObjectSchema: z.ZodType<Prisma.MealPlanOrderByRelationAggregateInput> =
  makeSchema() as unknown as z.ZodType<Prisma.MealPlanOrderByRelationAggregateInput>;
export const MealPlanOrderByRelationAggregateInputObjectZodSchema =
  makeSchema();
