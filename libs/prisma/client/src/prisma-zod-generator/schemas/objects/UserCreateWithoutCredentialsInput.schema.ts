import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserCreaterolesInputObjectSchema as UserCreaterolesInputObjectSchema } from './UserCreaterolesInput.schema';
import { RoleSchema } from '../enums/Role.schema';
import { UserCreateamrInputObjectSchema as UserCreateamrInputObjectSchema } from './UserCreateamrInput.schema';
import { UserProfileCreateNestedOneWithoutUserInputObjectSchema as UserProfileCreateNestedOneWithoutUserInputObjectSchema } from './UserProfileCreateNestedOneWithoutUserInput.schema';
import { PantryItemCreateNestedManyWithoutUserInputObjectSchema as PantryItemCreateNestedManyWithoutUserInputObjectSchema } from './PantryItemCreateNestedManyWithoutUserInput.schema';
import { RecipeCreateNestedManyWithoutAuthorInputObjectSchema as RecipeCreateNestedManyWithoutAuthorInputObjectSchema } from './RecipeCreateNestedManyWithoutAuthorInput.schema';
import { RecipeCollectionCreateNestedManyWithoutUserInputObjectSchema as RecipeCollectionCreateNestedManyWithoutUserInputObjectSchema } from './RecipeCollectionCreateNestedManyWithoutUserInput.schema';
import { MealPlanCreateNestedManyWithoutUserInputObjectSchema as MealPlanCreateNestedManyWithoutUserInputObjectSchema } from './MealPlanCreateNestedManyWithoutUserInput.schema';
import { CookingSessionCreateNestedManyWithoutUserInputObjectSchema as CookingSessionCreateNestedManyWithoutUserInputObjectSchema } from './CookingSessionCreateNestedManyWithoutUserInput.schema';

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
      cookingSessions: z
        .lazy(() => CookingSessionCreateNestedManyWithoutUserInputObjectSchema)
        .optional(),
    })
    .strict();
export const UserCreateWithoutCredentialsInputObjectSchema: z.ZodType<Prisma.UserCreateWithoutCredentialsInput> =
  makeSchema() as unknown as z.ZodType<Prisma.UserCreateWithoutCredentialsInput>;
export const UserCreateWithoutCredentialsInputObjectZodSchema = makeSchema();
