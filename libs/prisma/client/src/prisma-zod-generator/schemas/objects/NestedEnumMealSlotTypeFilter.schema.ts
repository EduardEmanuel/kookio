import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { MealSlotTypeSchema } from '../enums/MealSlotType.schema';

const nestedenummealslottypefilterSchema = z
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
export const NestedEnumMealSlotTypeFilterObjectSchema: z.ZodType<Prisma.NestedEnumMealSlotTypeFilter> =
  nestedenummealslottypefilterSchema as unknown as z.ZodType<Prisma.NestedEnumMealSlotTypeFilter>;
export const NestedEnumMealSlotTypeFilterObjectZodSchema =
  nestedenummealslottypefilterSchema;
