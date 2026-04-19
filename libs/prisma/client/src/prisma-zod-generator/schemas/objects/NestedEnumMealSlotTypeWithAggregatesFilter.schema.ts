import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { MealSlotTypeSchema } from '../enums/MealSlotType.schema';
import { NestedIntFilterObjectSchema as NestedIntFilterObjectSchema } from './NestedIntFilter.schema';
import { NestedEnumMealSlotTypeFilterObjectSchema as NestedEnumMealSlotTypeFilterObjectSchema } from './NestedEnumMealSlotTypeFilter.schema';

const nestedenummealslottypewithaggregatesfilterSchema = z
  .object({
    equals: MealSlotTypeSchema.optional(),
    in: MealSlotTypeSchema.array().optional(),
    notIn: MealSlotTypeSchema.array().optional(),
    not: z
      .union([
        MealSlotTypeSchema,
        z.lazy(() => NestedEnumMealSlotTypeWithAggregatesFilterObjectSchema),
      ])
      .optional(),
    _count: z.lazy(() => NestedIntFilterObjectSchema).optional(),
    _min: z.lazy(() => NestedEnumMealSlotTypeFilterObjectSchema).optional(),
    _max: z.lazy(() => NestedEnumMealSlotTypeFilterObjectSchema).optional(),
  })
  .strict();
export const NestedEnumMealSlotTypeWithAggregatesFilterObjectSchema: z.ZodType<Prisma.NestedEnumMealSlotTypeWithAggregatesFilter> =
  nestedenummealslottypewithaggregatesfilterSchema as unknown as z.ZodType<Prisma.NestedEnumMealSlotTypeWithAggregatesFilter>;
export const NestedEnumMealSlotTypeWithAggregatesFilterObjectZodSchema =
  nestedenummealslottypewithaggregatesfilterSchema;
