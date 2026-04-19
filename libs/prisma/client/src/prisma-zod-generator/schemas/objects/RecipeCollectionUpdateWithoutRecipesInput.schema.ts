import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { NullableStringFieldUpdateOperationsInputObjectSchema as NullableStringFieldUpdateOperationsInputObjectSchema } from './NullableStringFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema as DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { UserUpdateOneRequiredWithoutCollectionsNestedInputObjectSchema as UserUpdateOneRequiredWithoutCollectionsNestedInputObjectSchema } from './UserUpdateOneRequiredWithoutCollectionsNestedInput.schema';

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
      user: z
        .lazy(
          () => UserUpdateOneRequiredWithoutCollectionsNestedInputObjectSchema,
        )
        .optional(),
    })
    .strict();
export const RecipeCollectionUpdateWithoutRecipesInputObjectSchema: z.ZodType<Prisma.RecipeCollectionUpdateWithoutRecipesInput> =
  makeSchema() as unknown as z.ZodType<Prisma.RecipeCollectionUpdateWithoutRecipesInput>;
export const RecipeCollectionUpdateWithoutRecipesInputObjectZodSchema =
  makeSchema();
