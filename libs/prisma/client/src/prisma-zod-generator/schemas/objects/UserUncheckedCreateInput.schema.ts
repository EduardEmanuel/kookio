import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserCreaterolesInputObjectSchema as UserCreaterolesInputObjectSchema } from './UserCreaterolesInput.schema';
import { RoleSchema } from '../enums/Role.schema';
import { UserCreateamrInputObjectSchema as UserCreateamrInputObjectSchema } from './UserCreateamrInput.schema';
import { WebAuthnCredentialUncheckedCreateNestedManyWithoutUserInputObjectSchema as WebAuthnCredentialUncheckedCreateNestedManyWithoutUserInputObjectSchema } from './WebAuthnCredentialUncheckedCreateNestedManyWithoutUserInput.schema';
import { UserProfileUncheckedCreateNestedOneWithoutUserInputObjectSchema as UserProfileUncheckedCreateNestedOneWithoutUserInputObjectSchema } from './UserProfileUncheckedCreateNestedOneWithoutUserInput.schema';
import { PantryItemUncheckedCreateNestedManyWithoutUserInputObjectSchema as PantryItemUncheckedCreateNestedManyWithoutUserInputObjectSchema } from './PantryItemUncheckedCreateNestedManyWithoutUserInput.schema';
import { RecipeUncheckedCreateNestedManyWithoutAuthorInputObjectSchema as RecipeUncheckedCreateNestedManyWithoutAuthorInputObjectSchema } from './RecipeUncheckedCreateNestedManyWithoutAuthorInput.schema';
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
      credentials: z.lazy(
        () =>
          WebAuthnCredentialUncheckedCreateNestedManyWithoutUserInputObjectSchema,
      ),
      profile: z
        .lazy(
          () => UserProfileUncheckedCreateNestedOneWithoutUserInputObjectSchema,
        )
        .optional(),
      pantryItems: z.lazy(
        () => PantryItemUncheckedCreateNestedManyWithoutUserInputObjectSchema,
      ),
      recipes: z.lazy(
        () => RecipeUncheckedCreateNestedManyWithoutAuthorInputObjectSchema,
      ),
      collections: z.lazy(
        () =>
          RecipeCollectionUncheckedCreateNestedManyWithoutUserInputObjectSchema,
      ),
      mealPlans: z.lazy(
        () => MealPlanUncheckedCreateNestedManyWithoutUserInputObjectSchema,
      ),
      cookingSessions: z.lazy(
        () =>
          CookingSessionUncheckedCreateNestedManyWithoutUserInputObjectSchema,
      ),
    })
    .strict();
export const UserUncheckedCreateInputObjectSchema: z.ZodType<Prisma.UserUncheckedCreateInput> =
  makeSchema() as unknown as z.ZodType<Prisma.UserUncheckedCreateInput>;
export const UserUncheckedCreateInputObjectZodSchema = makeSchema();
