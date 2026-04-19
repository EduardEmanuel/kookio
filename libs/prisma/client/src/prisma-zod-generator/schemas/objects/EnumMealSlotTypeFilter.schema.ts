import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { MealSlotTypeSchema } from '../enums/MealSlotType.schema';
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
          z.lazy(() => NestedEnumMealSlotTypeFilterObjectSchema),
        ])
        .optional(),
    })
    .strict();
export const EnumMealSlotTypeFilterObjectSchema: z.ZodType<Prisma.EnumMealSlotTypeFilter> =
  makeSchema() as unknown as z.ZodType<Prisma.EnumMealSlotTypeFilter>;
export const EnumMealSlotTypeFilterObjectZodSchema = makeSchema();
