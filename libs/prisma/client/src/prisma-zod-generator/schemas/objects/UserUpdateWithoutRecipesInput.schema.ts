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
import { WebAuthnCredentialUpdateManyWithoutUserNestedInputObjectSchema as WebAuthnCredentialUpdateManyWithoutUserNestedInputObjectSchema } from './WebAuthnCredentialUpdateManyWithoutUserNestedInput.schema';
import { UserProfileUpdateOneWithoutUserNestedInputObjectSchema as UserProfileUpdateOneWithoutUserNestedInputObjectSchema } from './UserProfileUpdateOneWithoutUserNestedInput.schema';
import { PantryItemUpdateManyWithoutUserNestedInputObjectSchema as PantryItemUpdateManyWithoutUserNestedInputObjectSchema } from './PantryItemUpdateManyWithoutUserNestedInput.schema';
import { RecipeCollectionUpdateManyWithoutUserNestedInputObjectSchema as RecipeCollectionUpdateManyWithoutUserNestedInputObjectSchema } from './RecipeCollectionUpdateManyWithoutUserNestedInput.schema';
import { MealPlanUpdateManyWithoutUserNestedInputObjectSchema as MealPlanUpdateManyWithoutUserNestedInputObjectSchema } from './MealPlanUpdateManyWithoutUserNestedInput.schema';
import { CookingSessionUpdateManyWithoutUserNestedInputObjectSchema as CookingSessionUpdateManyWithoutUserNestedInputObjectSchema } from './CookingSessionUpdateManyWithoutUserNestedInput.schema';

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
          () => WebAuthnCredentialUpdateManyWithoutUserNestedInputObjectSchema,
        )
        .optional(),
      profile: z
        .lazy(() => UserProfileUpdateOneWithoutUserNestedInputObjectSchema)
        .optional(),
      pantryItems: z
        .lazy(() => PantryItemUpdateManyWithoutUserNestedInputObjectSchema)
        .optional(),
      collections: z
        .lazy(
          () => RecipeCollectionUpdateManyWithoutUserNestedInputObjectSchema,
        )
        .optional(),
      mealPlans: z
        .lazy(() => MealPlanUpdateManyWithoutUserNestedInputObjectSchema)
        .optional(),
      cookingSessions: z
        .lazy(() => CookingSessionUpdateManyWithoutUserNestedInputObjectSchema)
        .optional(),
    })
    .strict();
export const UserUpdateWithoutRecipesInputObjectSchema: z.ZodType<Prisma.UserUpdateWithoutRecipesInput> =
  makeSchema() as unknown as z.ZodType<Prisma.UserUpdateWithoutRecipesInput>;
export const UserUpdateWithoutRecipesInputObjectZodSchema = makeSchema();
