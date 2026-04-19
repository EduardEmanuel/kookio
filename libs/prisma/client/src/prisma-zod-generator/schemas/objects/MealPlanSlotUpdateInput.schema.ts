import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema as DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { MealSlotTypeSchema } from '../enums/MealSlotType.schema';
import { EnumMealSlotTypeFieldUpdateOperationsInputObjectSchema as EnumMealSlotTypeFieldUpdateOperationsInputObjectSchema } from './EnumMealSlotTypeFieldUpdateOperationsInput.schema';
import { IntFieldUpdateOperationsInputObjectSchema as IntFieldUpdateOperationsInputObjectSchema } from './IntFieldUpdateOperationsInput.schema';
import { MealPlanUpdateOneRequiredWithoutSlotsNestedInputObjectSchema as MealPlanUpdateOneRequiredWithoutSlotsNestedInputObjectSchema } from './MealPlanUpdateOneRequiredWithoutSlotsNestedInput.schema';
import { RecipeUpdateOneWithoutMealPlanSlotsNestedInputObjectSchema as RecipeUpdateOneWithoutMealPlanSlotsNestedInputObjectSchema } from './RecipeUpdateOneWithoutMealPlanSlotsNestedInput.schema';

const makeSchema = () =>
  z
    .object({
      id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
      date: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
      slotType: z
        .union([
          MealSlotTypeSchema,
          z.lazy(() => EnumMealSlotTypeFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
      servings: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
      mealPlan: z
        .lazy(
          () => MealPlanUpdateOneRequiredWithoutSlotsNestedInputObjectSchema,
        )
        .optional(),
      recipe: z
        .lazy(() => RecipeUpdateOneWithoutMealPlanSlotsNestedInputObjectSchema)
        .optional(),
    })
    .strict();
export const MealPlanSlotUpdateInputObjectSchema: z.ZodType<Prisma.MealPlanSlotUpdateInput> =
  makeSchema() as unknown as z.ZodType<Prisma.MealPlanSlotUpdateInput>;
export const MealPlanSlotUpdateInputObjectZodSchema = makeSchema();
