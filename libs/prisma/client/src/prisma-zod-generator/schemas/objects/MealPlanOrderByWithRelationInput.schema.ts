import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { UserOrderByWithRelationInputObjectSchema as UserOrderByWithRelationInputObjectSchema } from './UserOrderByWithRelationInput.schema';
import { MealPlanSlotOrderByRelationAggregateInputObjectSchema as MealPlanSlotOrderByRelationAggregateInputObjectSchema } from './MealPlanSlotOrderByRelationAggregateInput.schema';

const makeSchema = () =>
  z
    .object({
      id: SortOrderSchema.optional(),
      userId: SortOrderSchema.optional(),
      name: z
        .union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)])
        .optional(),
      startDate: SortOrderSchema.optional(),
      endDate: SortOrderSchema.optional(),
      createdAt: SortOrderSchema.optional(),
      updatedAt: SortOrderSchema.optional(),
      user: z.lazy(() => UserOrderByWithRelationInputObjectSchema).optional(),
      slots: z
        .lazy(() => MealPlanSlotOrderByRelationAggregateInputObjectSchema)
        .optional(),
    })
    .strict();
export const MealPlanOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.MealPlanOrderByWithRelationInput> =
  makeSchema() as unknown as z.ZodType<Prisma.MealPlanOrderByWithRelationInput>;
export const MealPlanOrderByWithRelationInputObjectZodSchema = makeSchema();
