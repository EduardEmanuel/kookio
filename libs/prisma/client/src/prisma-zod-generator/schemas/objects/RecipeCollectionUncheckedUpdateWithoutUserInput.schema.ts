import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { NullableStringFieldUpdateOperationsInputObjectSchema as NullableStringFieldUpdateOperationsInputObjectSchema } from './NullableStringFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema as DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { RecipeCollectionEntryUncheckedUpdateManyWithoutCollectionNestedInputObjectSchema as RecipeCollectionEntryUncheckedUpdateManyWithoutCollectionNestedInputObjectSchema } from './RecipeCollectionEntryUncheckedUpdateManyWithoutCollectionNestedInput.schema';

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
          z.lazy(() => StringFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
      emoji: z
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
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
      recipes: z
        .lazy(
          () =>
            RecipeCollectionEntryUncheckedUpdateManyWithoutCollectionNestedInputObjectSchema,
        )
        .optional(),
    })
    .strict();
export const RecipeCollectionUncheckedUpdateWithoutUserInputObjectSchema: z.ZodType<Prisma.RecipeCollectionUncheckedUpdateWithoutUserInput> =
  makeSchema() as unknown as z.ZodType<Prisma.RecipeCollectionUncheckedUpdateWithoutUserInput>;
export const RecipeCollectionUncheckedUpdateWithoutUserInputObjectZodSchema =
  makeSchema();
