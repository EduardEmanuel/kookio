import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringWithAggregatesFilterObjectSchema as StringWithAggregatesFilterObjectSchema } from './StringWithAggregatesFilter.schema';
import { StringNullableWithAggregatesFilterObjectSchema as StringNullableWithAggregatesFilterObjectSchema } from './StringNullableWithAggregatesFilter.schema';
import { DateTimeWithAggregatesFilterObjectSchema as DateTimeWithAggregatesFilterObjectSchema } from './DateTimeWithAggregatesFilter.schema';
import { EnumMealSlotTypeWithAggregatesFilterObjectSchema as EnumMealSlotTypeWithAggregatesFilterObjectSchema } from './EnumMealSlotTypeWithAggregatesFilter.schema';
import { MealSlotTypeSchema } from '../enums/MealSlotType.schema';
import { IntWithAggregatesFilterObjectSchema as IntWithAggregatesFilterObjectSchema } from './IntWithAggregatesFilter.schema';

const mealplanslotscalarwherewithaggregatesinputSchema = z
  .object({
    AND: z
      .union([
        z.lazy(() => MealPlanSlotScalarWhereWithAggregatesInputObjectSchema),
        z
          .lazy(() => MealPlanSlotScalarWhereWithAggregatesInputObjectSchema)
          .array(),
      ])
      .optional(),
    OR: z
      .lazy(() => MealPlanSlotScalarWhereWithAggregatesInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => MealPlanSlotScalarWhereWithAggregatesInputObjectSchema),
        z
          .lazy(() => MealPlanSlotScalarWhereWithAggregatesInputObjectSchema)
          .array(),
      ])
      .optional(),
    id: z
      .union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()])
      .optional(),
    mealPlanId: z
      .union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()])
      .optional(),
    recipeId: z
      .union([
        z.lazy(() => StringNullableWithAggregatesFilterObjectSchema),
        z.string(),
      ])
      .optional()
      .nullable(),
    date: z
      .union([
        z.lazy(() => DateTimeWithAggregatesFilterObjectSchema),
        z.coerce.date(),
      ])
      .optional(),
    slotType: z
      .union([
        z.lazy(() => EnumMealSlotTypeWithAggregatesFilterObjectSchema),
        MealSlotTypeSchema,
      ])
      .optional(),
    servings: z
      .union([
        z.lazy(() => IntWithAggregatesFilterObjectSchema),
        z.number().int(),
      ])
      .optional(),
  })
  .strict();
export const MealPlanSlotScalarWhereWithAggregatesInputObjectSchema: z.ZodType<Prisma.MealPlanSlotScalarWhereWithAggregatesInput> =
  mealplanslotscalarwherewithaggregatesinputSchema as unknown as z.ZodType<Prisma.MealPlanSlotScalarWhereWithAggregatesInput>;
export const MealPlanSlotScalarWhereWithAggregatesInputObjectZodSchema =
  mealplanslotscalarwherewithaggregatesinputSchema;
