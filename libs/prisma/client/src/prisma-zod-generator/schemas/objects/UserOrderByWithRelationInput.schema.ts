import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { WebAuthnCredentialOrderByRelationAggregateInputObjectSchema as WebAuthnCredentialOrderByRelationAggregateInputObjectSchema } from './WebAuthnCredentialOrderByRelationAggregateInput.schema';
import { UserProfileOrderByWithRelationInputObjectSchema as UserProfileOrderByWithRelationInputObjectSchema } from './UserProfileOrderByWithRelationInput.schema';
import { PantryItemOrderByRelationAggregateInputObjectSchema as PantryItemOrderByRelationAggregateInputObjectSchema } from './PantryItemOrderByRelationAggregateInput.schema';
import { RecipeOrderByRelationAggregateInputObjectSchema as RecipeOrderByRelationAggregateInputObjectSchema } from './RecipeOrderByRelationAggregateInput.schema';
import { RecipeCollectionOrderByRelationAggregateInputObjectSchema as RecipeCollectionOrderByRelationAggregateInputObjectSchema } from './RecipeCollectionOrderByRelationAggregateInput.schema';
import { MealPlanOrderByRelationAggregateInputObjectSchema as MealPlanOrderByRelationAggregateInputObjectSchema } from './MealPlanOrderByRelationAggregateInput.schema';
import { CookingSessionOrderByRelationAggregateInputObjectSchema as CookingSessionOrderByRelationAggregateInputObjectSchema } from './CookingSessionOrderByRelationAggregateInput.schema';

const makeSchema = () =>
  z
    .object({
      id: SortOrderSchema.optional(),
      email: SortOrderSchema.optional(),
      firebaseUid: z
        .union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)])
        .optional(),
      name: z
        .union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)])
        .optional(),
      roles: SortOrderSchema.optional(),
      amr: SortOrderSchema.optional(),
      isDisabled: SortOrderSchema.optional(),
      deletedAt: z
        .union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)])
        .optional(),
      createdAt: SortOrderSchema.optional(),
      updatedAt: SortOrderSchema.optional(),
      credentials: z
        .lazy(() => WebAuthnCredentialOrderByRelationAggregateInputObjectSchema)
        .optional(),
      profile: z
        .lazy(() => UserProfileOrderByWithRelationInputObjectSchema)
        .optional(),
      pantryItems: z
        .lazy(() => PantryItemOrderByRelationAggregateInputObjectSchema)
        .optional(),
      recipes: z
        .lazy(() => RecipeOrderByRelationAggregateInputObjectSchema)
        .optional(),
      collections: z
        .lazy(() => RecipeCollectionOrderByRelationAggregateInputObjectSchema)
        .optional(),
      mealPlans: z
        .lazy(() => MealPlanOrderByRelationAggregateInputObjectSchema)
        .optional(),
      cookingSessions: z
        .lazy(() => CookingSessionOrderByRelationAggregateInputObjectSchema)
        .optional(),
    })
    .strict();
export const UserOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.UserOrderByWithRelationInput> =
  makeSchema() as unknown as z.ZodType<Prisma.UserOrderByWithRelationInput>;
export const UserOrderByWithRelationInputObjectZodSchema = makeSchema();
