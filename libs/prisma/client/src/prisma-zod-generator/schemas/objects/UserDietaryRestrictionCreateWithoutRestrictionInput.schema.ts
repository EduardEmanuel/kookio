import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserProfileCreateNestedOneWithoutDietaryRestrictionsInputObjectSchema as UserProfileCreateNestedOneWithoutDietaryRestrictionsInputObjectSchema } from './UserProfileCreateNestedOneWithoutDietaryRestrictionsInput.schema';

const makeSchema = () =>
  z
    .object({
      user: z.lazy(
        () =>
          UserProfileCreateNestedOneWithoutDietaryRestrictionsInputObjectSchema,
      ),
    })
    .strict();
export const UserDietaryRestrictionCreateWithoutRestrictionInputObjectSchema: z.ZodType<Prisma.UserDietaryRestrictionCreateWithoutRestrictionInput> =
  makeSchema() as unknown as z.ZodType<Prisma.UserDietaryRestrictionCreateWithoutRestrictionInput>;
export const UserDietaryRestrictionCreateWithoutRestrictionInputObjectZodSchema =
  makeSchema();
