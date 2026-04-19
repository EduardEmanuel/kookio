import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { StringNullableFilterObjectSchema as StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { UserScalarRelationFilterObjectSchema as UserScalarRelationFilterObjectSchema } from './UserScalarRelationFilter.schema';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema';
import { MealPlanSlotListRelationFilterObjectSchema as MealPlanSlotListRelationFilterObjectSchema } from './MealPlanSlotListRelationFilter.schema';

const mealplanwhereinputSchema = z
  .object({
    AND: z
      .union([
        z.lazy(() => MealPlanWhereInputObjectSchema),
        z.lazy(() => MealPlanWhereInputObjectSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => MealPlanWhereInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => MealPlanWhereInputObjectSchema),
        z.lazy(() => MealPlanWhereInputObjectSchema).array(),
      ])
      .optional(),
    id: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    userId: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    name: z
      .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    startDate: z
      .union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()])
      .optional(),
    endDate: z
      .union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()])
      .optional(),
    createdAt: z
      .union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()])
      .optional(),
    updatedAt: z
      .union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()])
      .optional(),
    user: z
      .union([
        z.lazy(() => UserScalarRelationFilterObjectSchema),
        z.lazy(() => UserWhereInputObjectSchema),
      ])
      .optional(),
    slots: z.lazy(() => MealPlanSlotListRelationFilterObjectSchema).optional(),
  })
  .strict();
export const MealPlanWhereInputObjectSchema: z.ZodType<Prisma.MealPlanWhereInput> =
  mealplanwhereinputSchema as unknown as z.ZodType<Prisma.MealPlanWhereInput>;
export const MealPlanWhereInputObjectZodSchema = mealplanwhereinputSchema;
