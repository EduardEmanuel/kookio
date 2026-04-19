import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { NullableStringFieldUpdateOperationsInputObjectSchema as NullableStringFieldUpdateOperationsInputObjectSchema } from './NullableStringFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema as DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { MealPlanSlotUpdateManyWithoutMealPlanNestedInputObjectSchema as MealPlanSlotUpdateManyWithoutMealPlanNestedInputObjectSchema } from './MealPlanSlotUpdateManyWithoutMealPlanNestedInput.schema';

const makeSchema = () =>
  z
    .object({
      id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema),
        ])
        .optional()
        .nullable(),
      startDate: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
      endDate: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
      slots: z
        .lazy(
          () => MealPlanSlotUpdateManyWithoutMealPlanNestedInputObjectSchema,
        )
        .optional(),
    })
    .strict();
export const MealPlanUpdateWithoutUserInputObjectSchema: z.ZodType<Prisma.MealPlanUpdateWithoutUserInput> =
  makeSchema() as unknown as z.ZodType<Prisma.MealPlanUpdateWithoutUserInput>;
export const MealPlanUpdateWithoutUserInputObjectZodSchema = makeSchema();
