import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserProfileUpdateOneRequiredWithoutDietaryRestrictionsNestedInputObjectSchema as UserProfileUpdateOneRequiredWithoutDietaryRestrictionsNestedInputObjectSchema } from './UserProfileUpdateOneRequiredWithoutDietaryRestrictionsNestedInput.schema';
import { DietaryRestrictionUpdateOneRequiredWithoutUsersNestedInputObjectSchema as DietaryRestrictionUpdateOneRequiredWithoutUsersNestedInputObjectSchema } from './DietaryRestrictionUpdateOneRequiredWithoutUsersNestedInput.schema';

const makeSchema = () =>
  z
    .object({
      user: z
        .lazy(
          () =>
            UserProfileUpdateOneRequiredWithoutDietaryRestrictionsNestedInputObjectSchema,
        )
        .optional(),
      restriction: z
        .lazy(
          () =>
            DietaryRestrictionUpdateOneRequiredWithoutUsersNestedInputObjectSchema,
        )
        .optional(),
    })
    .strict();
export const UserDietaryRestrictionUpdateInputObjectSchema: z.ZodType<Prisma.UserDietaryRestrictionUpdateInput> =
  makeSchema() as unknown as z.ZodType<Prisma.UserDietaryRestrictionUpdateInput>;
export const UserDietaryRestrictionUpdateInputObjectZodSchema = makeSchema();
