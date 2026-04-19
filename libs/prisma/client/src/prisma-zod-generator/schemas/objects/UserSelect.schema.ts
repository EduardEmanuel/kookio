import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { WebAuthnCredentialFindManySchema as WebAuthnCredentialFindManySchema } from '../findManyWebAuthnCredential.schema';
import { UserProfileArgsObjectSchema as UserProfileArgsObjectSchema } from './UserProfileArgs.schema';
import { PantryItemFindManySchema as PantryItemFindManySchema } from '../findManyPantryItem.schema';
import { RecipeFindManySchema as RecipeFindManySchema } from '../findManyRecipe.schema';
import { RecipeCollectionFindManySchema as RecipeCollectionFindManySchema } from '../findManyRecipeCollection.schema';
import { MealPlanFindManySchema as MealPlanFindManySchema } from '../findManyMealPlan.schema';
import { CookingSessionFindManySchema as CookingSessionFindManySchema } from '../findManyCookingSession.schema';
import { UserCountOutputTypeArgsObjectSchema as UserCountOutputTypeArgsObjectSchema } from './UserCountOutputTypeArgs.schema';

const makeSchema = () =>
  z
    .object({
      id: z.boolean().optional(),
      email: z.boolean().optional(),
      firebaseUid: z.boolean().optional(),
      name: z.boolean().optional(),
      roles: z.boolean().optional(),
      amr: z.boolean().optional(),
      isDisabled: z.boolean().optional(),
      deletedAt: z.boolean().optional(),
      createdAt: z.boolean().optional(),
      updatedAt: z.boolean().optional(),
      credentials: z
        .union([z.boolean(), z.lazy(() => WebAuthnCredentialFindManySchema)])
        .optional(),
      profile: z
        .union([z.boolean(), z.lazy(() => UserProfileArgsObjectSchema)])
        .optional(),
      pantryItems: z
        .union([z.boolean(), z.lazy(() => PantryItemFindManySchema)])
        .optional(),
      recipes: z
        .union([z.boolean(), z.lazy(() => RecipeFindManySchema)])
        .optional(),
      collections: z
        .union([z.boolean(), z.lazy(() => RecipeCollectionFindManySchema)])
        .optional(),
      mealPlans: z
        .union([z.boolean(), z.lazy(() => MealPlanFindManySchema)])
        .optional(),
      cookingSessions: z
        .union([z.boolean(), z.lazy(() => CookingSessionFindManySchema)])
        .optional(),
      _count: z
        .union([z.boolean(), z.lazy(() => UserCountOutputTypeArgsObjectSchema)])
        .optional(),
    })
    .strict();
export const UserSelectObjectSchema: z.ZodType<Prisma.UserSelect> =
  makeSchema() as unknown as z.ZodType<Prisma.UserSelect>;
export const UserSelectObjectZodSchema = makeSchema();
