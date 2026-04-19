import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { IntFieldUpdateOperationsInputObjectSchema as IntFieldUpdateOperationsInputObjectSchema } from './IntFieldUpdateOperationsInput.schema';
import { NullableDateTimeFieldUpdateOperationsInputObjectSchema as NullableDateTimeFieldUpdateOperationsInputObjectSchema } from './NullableDateTimeFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema as DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { RecipeUpdateOneRequiredWithoutCookingSessionsNestedInputObjectSchema as RecipeUpdateOneRequiredWithoutCookingSessionsNestedInputObjectSchema } from './RecipeUpdateOneRequiredWithoutCookingSessionsNestedInput.schema';

const makeSchema = () =>
  z
    .object({
      id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
      servings: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
      completedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputObjectSchema),
        ])
        .optional()
        .nullable(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
      recipe: z
        .lazy(
          () =>
            RecipeUpdateOneRequiredWithoutCookingSessionsNestedInputObjectSchema,
        )
        .optional(),
    })
    .strict();
export const CookingSessionUpdateWithoutUserInputObjectSchema: z.ZodType<Prisma.CookingSessionUpdateWithoutUserInput> =
  makeSchema() as unknown as z.ZodType<Prisma.CookingSessionUpdateWithoutUserInput>;
export const CookingSessionUpdateWithoutUserInputObjectZodSchema = makeSchema();
