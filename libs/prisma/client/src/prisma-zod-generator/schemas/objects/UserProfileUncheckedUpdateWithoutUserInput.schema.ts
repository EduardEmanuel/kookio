import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { IntFieldUpdateOperationsInputObjectSchema as IntFieldUpdateOperationsInputObjectSchema } from './IntFieldUpdateOperationsInput.schema';
import { BoolFieldUpdateOperationsInputObjectSchema as BoolFieldUpdateOperationsInputObjectSchema } from './BoolFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema as DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { UserDietaryRestrictionUncheckedUpdateManyWithoutUserNestedInputObjectSchema as UserDietaryRestrictionUncheckedUpdateManyWithoutUserNestedInputObjectSchema } from './UserDietaryRestrictionUncheckedUpdateManyWithoutUserNestedInput.schema';
import { UserUtensilUncheckedUpdateManyWithoutUserNestedInputObjectSchema as UserUtensilUncheckedUpdateManyWithoutUserNestedInputObjectSchema } from './UserUtensilUncheckedUpdateManyWithoutUserNestedInput.schema';

const makeSchema = () =>
  z
    .object({
      id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
      adultsCount: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
      childrenCount: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
      onboardingDone: z
        .union([
          z.boolean(),
          z.lazy(() => BoolFieldUpdateOperationsInputObjectSchema),
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
      dietaryRestrictions: z
        .lazy(
          () =>
            UserDietaryRestrictionUncheckedUpdateManyWithoutUserNestedInputObjectSchema,
        )
        .optional(),
      utensils: z
        .lazy(
          () =>
            UserUtensilUncheckedUpdateManyWithoutUserNestedInputObjectSchema,
        )
        .optional(),
    })
    .strict();
export const UserProfileUncheckedUpdateWithoutUserInputObjectSchema: z.ZodType<Prisma.UserProfileUncheckedUpdateWithoutUserInput> =
  makeSchema() as unknown as z.ZodType<Prisma.UserProfileUncheckedUpdateWithoutUserInput>;
export const UserProfileUncheckedUpdateWithoutUserInputObjectZodSchema =
  makeSchema();
