import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { NullableStringFieldUpdateOperationsInputObjectSchema as NullableStringFieldUpdateOperationsInputObjectSchema } from './NullableStringFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema as DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { RecipeUncheckedUpdateManyWithoutAreaNestedInputObjectSchema as RecipeUncheckedUpdateManyWithoutAreaNestedInputObjectSchema } from './RecipeUncheckedUpdateManyWithoutAreaNestedInput.schema';

const makeSchema = () =>
  z
    .object({
      id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
      externalId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
      flag: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema),
        ])
        .optional()
        .nullable(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
      recipes: z
        .lazy(() => RecipeUncheckedUpdateManyWithoutAreaNestedInputObjectSchema)
        .optional(),
    })
    .strict();
export const MealAreaUncheckedUpdateInputObjectSchema: z.ZodType<Prisma.MealAreaUncheckedUpdateInput> =
  makeSchema() as unknown as z.ZodType<Prisma.MealAreaUncheckedUpdateInput>;
export const MealAreaUncheckedUpdateInputObjectZodSchema = makeSchema();
