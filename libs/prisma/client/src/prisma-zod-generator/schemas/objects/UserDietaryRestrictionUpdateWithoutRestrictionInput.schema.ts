import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserProfileUpdateOneRequiredWithoutDietaryRestrictionsNestedInputObjectSchema as UserProfileUpdateOneRequiredWithoutDietaryRestrictionsNestedInputObjectSchema } from './UserProfileUpdateOneRequiredWithoutDietaryRestrictionsNestedInput.schema';

const makeSchema = () =>
  z
    .object({
      user: z
        .lazy(
          () =>
            UserProfileUpdateOneRequiredWithoutDietaryRestrictionsNestedInputObjectSchema,
        )
        .optional(),
    })
    .strict();
export const UserDietaryRestrictionUpdateWithoutRestrictionInputObjectSchema: z.ZodType<Prisma.UserDietaryRestrictionUpdateWithoutRestrictionInput> =
  makeSchema() as unknown as z.ZodType<Prisma.UserDietaryRestrictionUpdateWithoutRestrictionInput>;
export const UserDietaryRestrictionUpdateWithoutRestrictionInputObjectZodSchema =
  makeSchema();
