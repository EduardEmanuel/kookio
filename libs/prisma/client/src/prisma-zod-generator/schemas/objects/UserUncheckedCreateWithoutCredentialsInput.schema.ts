import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserCreaterolesInputObjectSchema as UserCreaterolesInputObjectSchema } from './UserCreaterolesInput.schema';
import { RoleSchema } from '../enums/Role.schema';
import { UserCreateamrInputObjectSchema as UserCreateamrInputObjectSchema } from './UserCreateamrInput.schema';
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
      updatedAt: z.coerce.date().optional(),
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
      recipes: z
        .lazy(
          () => RecipeUncheckedCreateNestedManyWithoutAuthorInputObjectSchema,
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
export const UserUncheckedCreateWithoutCredentialsInputObjectSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutCredentialsInput> =
  makeSchema() as unknown as z.ZodType<Prisma.UserUncheckedCreateWithoutCredentialsInput>;
export const UserUncheckedCreateWithoutCredentialsInputObjectZodSchema =
  makeSchema();
