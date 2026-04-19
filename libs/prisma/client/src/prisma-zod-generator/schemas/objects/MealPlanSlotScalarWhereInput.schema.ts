import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { StringNullableFilterObjectSchema as StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { EnumMealSlotTypeFilterObjectSchema as EnumMealSlotTypeFilterObjectSchema } from './EnumMealSlotTypeFilter.schema';
import { MealSlotTypeSchema } from '../enums/MealSlotType.schema';
import { IntFilterObjectSchema as IntFilterObjectSchema } from './IntFilter.schema';

const mealplanslotscalarwhereinputSchema = z
  .object({
    AND: z
      .union([
        z.lazy(() => MealPlanSlotScalarWhereInputObjectSchema),
        z.lazy(() => MealPlanSlotScalarWhereInputObjectSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => MealPlanSlotScalarWhereInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => MealPlanSlotScalarWhereInputObjectSchema),
        z.lazy(() => MealPlanSlotScalarWhereInputObjectSchema).array(),
      ])
      .optional(),
    id: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    mealPlanId: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    recipeId: z
      .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    date: z
      .union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()])
      .optional(),
    slotType: z
      .union([
        z.lazy(() => EnumMealSlotTypeFilterObjectSchema),
        MealSlotTypeSchema,
      ])
      .optional(),
    servings: z
      .union([z.lazy(() => IntFilterObjectSchema), z.number().int()])
      .optional(),
  })
  .strict();
export const MealPlanSlotScalarWhereInputObjectSchema: z.ZodType<Prisma.MealPlanSlotScalarWhereInput> =
  mealplanslotscalarwhereinputSchema as unknown as z.ZodType<Prisma.MealPlanSlotScalarWhereInput>;
export const MealPlanSlotScalarWhereInputObjectZodSchema =
  mealplanslotscalarwhereinputSchema;
