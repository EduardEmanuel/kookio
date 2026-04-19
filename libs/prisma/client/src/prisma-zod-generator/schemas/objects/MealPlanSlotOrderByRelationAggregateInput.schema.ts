import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';

const makeSchema = () =>
  z
    .object({
      _count: SortOrderSchema.optional(),
    })
    .strict();
export const MealPlanSlotOrderByRelationAggregateInputObjectSchema: z.ZodType<Prisma.MealPlanSlotOrderByRelationAggregateInput> =
  makeSchema() as unknown as z.ZodType<Prisma.MealPlanSlotOrderByRelationAggregateInput>;
export const MealPlanSlotOrderByRelationAggregateInputObjectZodSchema =
  makeSchema();
