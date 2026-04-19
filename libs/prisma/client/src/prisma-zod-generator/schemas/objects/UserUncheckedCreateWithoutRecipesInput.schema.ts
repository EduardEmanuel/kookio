import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserCreaterolesInputObjectSchema as UserCreaterolesInputObjectSchema } from './UserCreaterolesInput.schema';
import { RoleSchema } from '../enums/Role.schema';
import { UserCreateamrInputObjectSchema as UserCreateamrInputObjectSchema } from './UserCreateamrInput.schema';
import { WebAuthnCredentialUncheckedCreateNestedManyWithoutUserInputObjectSchema as WebAuthnCredentialUncheckedCreateNestedManyWithoutUserInputObjectSchema } from './WebAuthnCredentialUncheckedCreateNestedManyWithoutUserInput.schema';
import { UserProfileUncheckedCreateNestedOneWithoutUserInputObjectSchema as UserProfileUncheckedCreateNestedOneWithoutUserInputObjectSchema } from './UserProfileUncheckedCreateNestedOneWithoutUserInput.schema';
import { PantryItemUncheckedCreateNestedManyWithoutUserInputObjectSchema as PantryItemUncheckedCreateNestedManyWithoutUserInputObjectSchema } from './PantryItemUncheckedCreateNestedManyWithoutUserInput.schema';
import { RecipeCollectionUncheckedCreateNestedManyWithoutUserInputObjectSchema as RecipeCollectionUncheckedCreateNestedManyWithoutUserInputObjectSchema } from './RecipeCollectionUncheckedCreateNestedManyWithoutUserInput.schema';
import { MealPlanUncheckedCreateNestedManyWithoutUserInputObjectSchema as MealPlanUncheckedCreateNestedManyWithoutUserInputObjectSchema } from './MealPlanUncheckedCreateNestedManyWithoutUserInput.schema';
import { CookingSessionUncheckedCreateNestedManyWithoutUserInputObjectSchema as CookingSessionUncheckedCreateNestedManyWithoutUserInputObjectSchema } from './CookingSessionUncheckedCreateNestedManyWithoutUserInput.schema';

const makeSchema = () =>
  z
    .object({
      id: z.string().optional(),
      email: z.string(),
      firebaseUid: z.string().optional().nullable(),
      name: z.string().optional().nullable(),
      roles: z
        .union([
          z.lazy(() => UserCreaterolesInputObjectSchema),
          RoleSchema.array(),
        ])
        .optional(),
      amr: z
        .union([
          z.lazy(() => UserCreateamrInputObjectSchema),
          z.string().array(),
        ])
        .optional(),
      isDisabled: z.boolean().optional(),
      deletedAt: z.coerce.date().optional().nullable(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
      credentials: z
        .lazy(
          () =>
            WebAuthnCredentialUncheckedCreateNestedManyWithoutUserInputObjectSchema,
        )
        .optional(),
      profile: z
        .lazy(
          () => UserProfileUncheckedCreateNestedOneWithoutUserInputObjectSchema,
        )
        .optional(),
      pantryItems: z
        .lazy(
          () => PantryItemUncheckedCreateNestedManyWithoutUserInputObjectSchema,
        )
        .optional(),
      collections: z
        .lazy(
          () =>
            RecipeCollectionUncheckedCreateNestedManyWithoutUserInputObjectSchema,
        )
        .optional(),
      mealPlans: z
        .lazy(
          () => MealPlanUncheckedCreateNestedManyWithoutUserInputObjectSchema,
        )
        .optional(),
      cookingSessions: z
        .lazy(
          () =>
            CookingSessionUncheckedCreateNestedManyWithoutUserInputObjectSchema,
        )
        .optional(),
    })
    .strict();
export const UserUncheckedCreateWithoutRecipesInputObjectSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutRecipesInput> =
  makeSchema() as unknown as z.ZodType<Prisma.UserUncheckedCreateWithoutRecipesInput>;
export const UserUncheckedCreateWithoutRecipesInputObjectZodSchema =
  makeSchema();
