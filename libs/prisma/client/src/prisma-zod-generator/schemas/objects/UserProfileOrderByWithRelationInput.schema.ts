import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { UserOrderByWithRelationInputObjectSchema as UserOrderByWithRelationInputObjectSchema } from './UserOrderByWithRelationInput.schema';
import { UserDietaryRestrictionOrderByRelationAggregateInputObjectSchema as UserDietaryRestrictionOrderByRelationAggregateInputObjectSchema } from './UserDietaryRestrictionOrderByRelationAggregateInput.schema';
import { UserUtensilOrderByRelationAggregateInputObjectSchema as UserUtensilOrderByRelationAggregateInputObjectSchema } from './UserUtensilOrderByRelationAggregateInput.schema';

const makeSchema = () =>
  z
    .object({
      id: SortOrderSchema.optional(),
      userId: SortOrderSchema.optional(),
      adultsCount: SortOrderSchema.optional(),
      childrenCount: SortOrderSchema.optional(),
      onboardingDone: SortOrderSchema.optional(),
      createdAt: SortOrderSchema.optional(),
      updatedAt: SortOrderSchema.optional(),
      user: z.lazy(() => UserOrderByWithRelationInputObjectSchema).optional(),
      dietaryRestrictions: z
        .lazy(
          () => UserDietaryRestrictionOrderByRelationAggregateInputObjectSchema,
        )
        .optional(),
      utensils: z
        .lazy(() => UserUtensilOrderByRelationAggregateInputObjectSchema)
        .optional(),
    })
    .strict();
export const UserProfileOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.UserProfileOrderByWithRelationInput> =
  makeSchema() as unknown as z.ZodType<Prisma.UserProfileOrderByWithRelationInput>;
export const UserProfileOrderByWithRelationInputObjectZodSchema = makeSchema();
