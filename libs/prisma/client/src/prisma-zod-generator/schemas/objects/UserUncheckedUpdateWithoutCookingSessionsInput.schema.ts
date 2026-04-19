import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { NullableStringFieldUpdateOperationsInputObjectSchema as NullableStringFieldUpdateOperationsInputObjectSchema } from './NullableStringFieldUpdateOperationsInput.schema';
import { UserUpdaterolesInputObjectSchema as UserUpdaterolesInputObjectSchema } from './UserUpdaterolesInput.schema';
import { RoleSchema } from '../enums/Role.schema';
import { UserUpdateamrInputObjectSchema as UserUpdateamrInputObjectSchema } from './UserUpdateamrInput.schema';
import { BoolFieldUpdateOperationsInputObjectSchema as BoolFieldUpdateOperationsInputObjectSchema } from './BoolFieldUpdateOperationsInput.schema';
import { NullableDateTimeFieldUpdateOperationsInputObjectSchema as NullableDateTimeFieldUpdateOperationsInputObjectSchema } from './NullableDateTimeFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema as DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { WebAuthnCredentialUncheckedUpdateManyWithoutUserNestedInputObjectSchema as WebAuthnCredentialUncheckedUpdateManyWithoutUserNestedInputObjectSchema } from './WebAuthnCredentialUncheckedUpdateManyWithoutUserNestedInput.schema';
import { UserProfileUncheckedUpdateOneWithoutUserNestedInputObjectSchema as UserProfileUncheckedUpdateOneWithoutUserNestedInputObjectSchema } from './UserProfileUncheckedUpdateOneWithoutUserNestedInput.schema';
import { PantryItemUncheckedUpdateManyWithoutUserNestedInputObjectSchema as PantryItemUncheckedUpdateManyWithoutUserNestedInputObjectSchema } from './PantryItemUncheckedUpdateManyWithoutUserNestedInput.schema';
import { RecipeUncheckedUpdateManyWithoutAuthorNestedInputObjectSchema as RecipeUncheckedUpdateManyWithoutAuthorNestedInputObjectSchema } from './RecipeUncheckedUpdateManyWithoutAuthorNestedInput.schema';
import { RecipeCollectionUncheckedUpdateManyWithoutUserNestedInputObjectSchema as RecipeCollectionUncheckedUpdateManyWithoutUserNestedInputObjectSchema } from './RecipeCollectionUncheckedUpdateManyWithoutUserNestedInput.schema';
import { MealPlanUncheckedUpdateManyWithoutUserNestedInputObjectSchema as MealPlanUncheckedUpdateManyWithoutUserNestedInputObjectSchema } from './MealPlanUncheckedUpdateManyWithoutUserNestedInput.schema';

const makeSchema = () =>
  z
    .object({
      id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
      email: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
      firebaseUid: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema),
        ])
        .optional()
        .nullable(),
      name: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema),
        ])
        .optional()
        .nullable(),
      roles: z
        .union([
          z.lazy(() => UserUpdaterolesInputObjectSchema),
          RoleSchema.array(),
        ])
        .optional(),
      amr: z
        .union([
          z.lazy(() => UserUpdateamrInputObjectSchema),
          z.string().array(),
        ])
        .optional(),
      isDisabled: z
        .union([
          z.boolean(),
          z.lazy(() => BoolFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
      deletedAt: z
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
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
      credentials: z
        .lazy(
          () =>
            WebAuthnCredentialUncheckedUpdateManyWithoutUserNestedInputObjectSchema,
        )
        .optional(),
      profile: z
        .lazy(
          () => UserProfileUncheckedUpdateOneWithoutUserNestedInputObjectSchema,
        )
        .optional(),
      pantryItems: z
        .lazy(
          () => PantryItemUncheckedUpdateManyWithoutUserNestedInputObjectSchema,
        )
        .optional(),
      recipes: z
        .lazy(
          () => RecipeUncheckedUpdateManyWithoutAuthorNestedInputObjectSchema,
        )
        .optional(),
      collections: z
        .lazy(
          () =>
            RecipeCollectionUncheckedUpdateManyWithoutUserNestedInputObjectSchema,
        )
        .optional(),
      mealPlans: z
        .lazy(
          () => MealPlanUncheckedUpdateManyWithoutUserNestedInputObjectSchema,
        )
        .optional(),
    })
    .strict();
export const UserUncheckedUpdateWithoutCookingSessionsInputObjectSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutCookingSessionsInput> =
  makeSchema() as unknown as z.ZodType<Prisma.UserUncheckedUpdateWithoutCookingSessionsInput>;
export const UserUncheckedUpdateWithoutCookingSessionsInputObjectZodSchema =
  makeSchema();
