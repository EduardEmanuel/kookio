import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { IntFieldUpdateOperationsInputObjectSchema as IntFieldUpdateOperationsInputObjectSchema } from './IntFieldUpdateOperationsInput.schema';
import { BoolFieldUpdateOperationsInputObjectSchema as BoolFieldUpdateOperationsInputObjectSchema } from './BoolFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema as DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { UserUpdateOneRequiredWithoutProfileNestedInputObjectSchema as UserUpdateOneRequiredWithoutProfileNestedInputObjectSchema } from './UserUpdateOneRequiredWithoutProfileNestedInput.schema';
import { UserDietaryRestrictionUpdateManyWithoutUserNestedInputObjectSchema as UserDietaryRestrictionUpdateManyWithoutUserNestedInputObjectSchema } from './UserDietaryRestrictionUpdateManyWithoutUserNestedInput.schema';

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
      user: z
        .lazy(() => UserUpdateOneRequiredWithoutProfileNestedInputObjectSchema)
        .optional(),
      dietaryRestrictions: z
        .lazy(
          () =>
            UserDietaryRestrictionUpdateManyWithoutUserNestedInputObjectSchema,
        )
        .optional(),
    })
    .strict();
export const UserProfileUpdateWithoutUtensilsInputObjectSchema: z.ZodType<Prisma.UserProfileUpdateWithoutUtensilsInput> =
  makeSchema() as unknown as z.ZodType<Prisma.UserProfileUpdateWithoutUtensilsInput>;
export const UserProfileUpdateWithoutUtensilsInputObjectZodSchema =
  makeSchema();
