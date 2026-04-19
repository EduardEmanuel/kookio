import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { StringNullableFilterObjectSchema as StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { EnumRoleNullableListFilterObjectSchema as EnumRoleNullableListFilterObjectSchema } from './EnumRoleNullableListFilter.schema';
import { StringNullableListFilterObjectSchema as StringNullableListFilterObjectSchema } from './StringNullableListFilter.schema';
import { BoolFilterObjectSchema as BoolFilterObjectSchema } from './BoolFilter.schema';
import { DateTimeNullableFilterObjectSchema as DateTimeNullableFilterObjectSchema } from './DateTimeNullableFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { WebAuthnCredentialListRelationFilterObjectSchema as WebAuthnCredentialListRelationFilterObjectSchema } from './WebAuthnCredentialListRelationFilter.schema';
import { UserProfileNullableScalarRelationFilterObjectSchema as UserProfileNullableScalarRelationFilterObjectSchema } from './UserProfileNullableScalarRelationFilter.schema';
import { UserProfileWhereInputObjectSchema as UserProfileWhereInputObjectSchema } from './UserProfileWhereInput.schema';
import { PantryItemListRelationFilterObjectSchema as PantryItemListRelationFilterObjectSchema } from './PantryItemListRelationFilter.schema';
import { RecipeListRelationFilterObjectSchema as RecipeListRelationFilterObjectSchema } from './RecipeListRelationFilter.schema';
import { RecipeCollectionListRelationFilterObjectSchema as RecipeCollectionListRelationFilterObjectSchema } from './RecipeCollectionListRelationFilter.schema';
import { MealPlanListRelationFilterObjectSchema as MealPlanListRelationFilterObjectSchema } from './MealPlanListRelationFilter.schema';
import { CookingSessionListRelationFilterObjectSchema as CookingSessionListRelationFilterObjectSchema } from './CookingSessionListRelationFilter.schema';

const userwhereinputSchema = z
  .object({
    AND: z
      .union([
        z.lazy(() => UserWhereInputObjectSchema),
        z.lazy(() => UserWhereInputObjectSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => UserWhereInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => UserWhereInputObjectSchema),
        z.lazy(() => UserWhereInputObjectSchema).array(),
      ])
      .optional(),
    id: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    email: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    firebaseUid: z
      .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    name: z
      .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    roles: z.lazy(() => EnumRoleNullableListFilterObjectSchema).optional(),
    amr: z.lazy(() => StringNullableListFilterObjectSchema).optional(),
    isDisabled: z
      .union([z.lazy(() => BoolFilterObjectSchema), z.boolean()])
      .optional(),
    deletedAt: z
      .union([
        z.lazy(() => DateTimeNullableFilterObjectSchema),
        z.coerce.date(),
      ])
      .optional()
      .nullable(),
    createdAt: z
      .union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()])
      .optional(),
    updatedAt: z
      .union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()])
      .optional(),
    credentials: z
      .lazy(() => WebAuthnCredentialListRelationFilterObjectSchema)
      .optional(),
    profile: z
      .union([
        z.lazy(() => UserProfileNullableScalarRelationFilterObjectSchema),
        z.lazy(() => UserProfileWhereInputObjectSchema),
      ])
      .optional(),
    pantryItems: z
      .lazy(() => PantryItemListRelationFilterObjectSchema)
      .optional(),
    recipes: z.lazy(() => RecipeListRelationFilterObjectSchema).optional(),
    collections: z
      .lazy(() => RecipeCollectionListRelationFilterObjectSchema)
      .optional(),
    mealPlans: z.lazy(() => MealPlanListRelationFilterObjectSchema).optional(),
    cookingSessions: z
      .lazy(() => CookingSessionListRelationFilterObjectSchema)
      .optional(),
  })
  .strict();
export const UserWhereInputObjectSchema: z.ZodType<Prisma.UserWhereInput> =
  userwhereinputSchema as unknown as z.ZodType<Prisma.UserWhereInput>;
export const UserWhereInputObjectZodSchema = userwhereinputSchema;
