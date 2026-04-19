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
export const UserIncludeObjectSchema: z.ZodType<Prisma.UserInclude> =
  makeSchema() as unknown as z.ZodType<Prisma.UserInclude>;
export const UserIncludeObjectZodSchema = makeSchema();
