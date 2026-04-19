import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { MealSlotTypeSchema } from '../enums/MealSlotType.schema';

const makeSchema = () =>
  z
    .object({
      set: MealSlotTypeSchema.optional(),
    })
    .strict();
export const EnumMealSlotTypeFieldUpdateOperationsInputObjectSchema: z.ZodType<Prisma.EnumMealSlotTypeFieldUpdateOperationsInput> =
  makeSchema() as unknown as z.ZodType<Prisma.EnumMealSlotTypeFieldUpdateOperationsInput>;
export const EnumMealSlotTypeFieldUpdateOperationsInputObjectZodSchema =
  makeSchema();
