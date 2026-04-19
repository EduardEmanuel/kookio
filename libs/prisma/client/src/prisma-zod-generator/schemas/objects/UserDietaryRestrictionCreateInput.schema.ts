import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserProfileCreateNestedOneWithoutDietaryRestrictionsInputObjectSchema as UserProfileCreateNestedOneWithoutDietaryRestrictionsInputObjectSchema } from './UserProfileCreateNestedOneWithoutDietaryRestrictionsInput.schema';
import { DietaryRestrictionCreateNestedOneWithoutUsersInputObjectSchema as DietaryRestrictionCreateNestedOneWithoutUsersInputObjectSchema } from './DietaryRestrictionCreateNestedOneWithoutUsersInput.schema';

const makeSchema = () =>
  z
    .object({
      user: z.lazy(
        () =>
          UserProfileCreateNestedOneWithoutDietaryRestrictionsInputObjectSchema,
      ),
      restriction: z.lazy(
        () => DietaryRestrictionCreateNestedOneWithoutUsersInputObjectSchema,
      ),
    })
    .strict();
export const UserDietaryRestrictionCreateInputObjectSchema: z.ZodType<Prisma.UserDietaryRestrictionCreateInput> =
  makeSchema() as unknown as z.ZodType<Prisma.UserDietaryRestrictionCreateInput>;
export const UserDietaryRestrictionCreateInputObjectZodSchema = makeSchema();
