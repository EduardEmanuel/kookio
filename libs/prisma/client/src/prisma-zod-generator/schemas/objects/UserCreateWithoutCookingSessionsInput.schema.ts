import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserCreaterolesInputObjectSchema as UserCreaterolesInputObjectSchema } from './UserCreaterolesInput.schema';
import { RoleSchema } from '../enums/Role.schema';
import { UserCreateamrInputObjectSchema as UserCreateamrInputObjectSchema } from './UserCreateamrInput.schema';
import { WebAuthnCredentialCreateNestedManyWithoutUserInputObjectSchema as WebAuthnCredentialCreateNestedManyWithoutUserInputObjectSchema } from './WebAuthnCredentialCreateNestedManyWithoutUserInput.schema';
import { UserProfileCreateNestedOneWithoutUserInputObjectSchema as UserProfileCreateNestedOneWithoutUserInputObjectSchema } from './UserProfileCreateNestedOneWithoutUserInput.schema';
import { PantryItemCreateNestedManyWithoutUserInputObjectSchema as PantryItemCreateNestedManyWithoutUserInputObjectSchema } from './PantryItemCreateNestedManyWithoutUserInput.schema';
import { RecipeCreateNestedManyWithoutAuthorInputObjectSchema as RecipeCreateNestedManyWithoutAuthorInputObjectSchema } from './RecipeCreateNestedManyWithoutAuthorInput.schema';
import { RecipeCollectionCreateNestedManyWithoutUserInputObjectSchema as RecipeCollectionCreateNestedManyWithoutUserInputObjectSchema } from './RecipeCollectionCreateNestedManyWithoutUserInput.schema';
import { MealPlanCreateNestedManyWithoutUserInputObjectSchema as MealPlanCreateNestedManyWithoutUserInputObjectSchema } from './MealPlanCreateNestedManyWithoutUserInput.schema';

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
          () => WebAuthnCredentialCreateNestedManyWithoutUserInputObjectSchema,
        )
        .optional(),
      profile: z
        .lazy(() => UserProfileCreateNestedOneWithoutUserInputObjectSchema)
        .optional(),
      pantryItems: z
        .lazy(() => PantryItemCreateNestedManyWithoutUserInputObjectSchema)
        .optional(),
      recipes: z
        .lazy(() => RecipeCreateNestedManyWithoutAuthorInputObjectSchema)
        .optional(),
      collections: z
        .lazy(
          () => RecipeCollectionCreateNestedManyWithoutUserInputObjectSchema,
        )
        .optional(),
      mealPlans: z
        .lazy(() => MealPlanCreateNestedManyWithoutUserInputObjectSchema)
        .optional(),
    })
    .strict();
export const UserCreateWithoutCookingSessionsInputObjectSchema: z.ZodType<Prisma.UserCreateWithoutCookingSessionsInput> =
  makeSchema() as unknown as z.ZodType<Prisma.UserCreateWithoutCookingSessionsInput>;
export const UserCreateWithoutCookingSessionsInputObjectZodSchema =
  makeSchema();
