import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { UserProfileOrderByWithRelationInputObjectSchema as UserProfileOrderByWithRelationInputObjectSchema } from './UserProfileOrderByWithRelationInput.schema';
import { DietaryRestrictionOrderByWithRelationInputObjectSchema as DietaryRestrictionOrderByWithRelationInputObjectSchema } from './DietaryRestrictionOrderByWithRelationInput.schema';

const makeSchema = () =>
  z
    .object({
      userId: SortOrderSchema.optional(),
      dietaryRestrictionId: SortOrderSchema.optional(),
      user: z
        .lazy(() => UserProfileOrderByWithRelationInputObjectSchema)
        .optional(),
      restriction: z
        .lazy(() => DietaryRestrictionOrderByWithRelationInputObjectSchema)
        .optional(),
    })
    .strict();
export const UserDietaryRestrictionOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.UserDietaryRestrictionOrderByWithRelationInput> =
  makeSchema() as unknown as z.ZodType<Prisma.UserDietaryRestrictionOrderByWithRelationInput>;
export const UserDietaryRestrictionOrderByWithRelationInputObjectZodSchema =
  makeSchema();
