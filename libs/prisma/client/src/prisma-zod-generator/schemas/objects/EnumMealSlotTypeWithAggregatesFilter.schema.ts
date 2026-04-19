import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { MealSlotTypeSchema } from '../enums/MealSlotType.schema';
import { NestedEnumMealSlotTypeWithAggregatesFilterObjectSchema as NestedEnumMealSlotTypeWithAggregatesFilterObjectSchema } from './NestedEnumMealSlotTypeWithAggregatesFilter.schema';
import { NestedIntFilterObjectSchema as NestedIntFilterObjectSchema } from './NestedIntFilter.schema';
import { NestedEnumMealSlotTypeFilterObjectSchema as NestedEnumMealSlotTypeFilterObjectSchema } from './NestedEnumMealSlotTypeFilter.schema';

const makeSchema = () =>
  z
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
export const EnumMealSlotTypeWithAggregatesFilterObjectSchema: z.ZodType<Prisma.EnumMealSlotTypeWithAggregatesFilter> =
  makeSchema() as unknown as z.ZodType<Prisma.EnumMealSlotTypeWithAggregatesFilter>;
export const EnumMealSlotTypeWithAggregatesFilterObjectZodSchema = makeSchema();
