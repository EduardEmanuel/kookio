import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { UserProfileScalarRelationFilterObjectSchema as UserProfileScalarRelationFilterObjectSchema } from './UserProfileScalarRelationFilter.schema';
import { UserProfileWhereInputObjectSchema as UserProfileWhereInputObjectSchema } from './UserProfileWhereInput.schema';
import { DietaryRestrictionScalarRelationFilterObjectSchema as DietaryRestrictionScalarRelationFilterObjectSchema } from './DietaryRestrictionScalarRelationFilter.schema';
import { DietaryRestrictionWhereInputObjectSchema as DietaryRestrictionWhereInputObjectSchema } from './DietaryRestrictionWhereInput.schema';

const userdietaryrestrictionwhereinputSchema = z
  .object({
    AND: z
      .union([
        z.lazy(() => UserDietaryRestrictionWhereInputObjectSchema),
        z.lazy(() => UserDietaryRestrictionWhereInputObjectSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => UserDietaryRestrictionWhereInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => UserDietaryRestrictionWhereInputObjectSchema),
        z.lazy(() => UserDietaryRestrictionWhereInputObjectSchema).array(),
      ])
      .optional(),
    userId: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    dietaryRestrictionId: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    user: z
      .union([
        z.lazy(() => UserProfileScalarRelationFilterObjectSchema),
        z.lazy(() => UserProfileWhereInputObjectSchema),
      ])
      .optional(),
    restriction: z
      .union([
        z.lazy(() => DietaryRestrictionScalarRelationFilterObjectSchema),
        z.lazy(() => DietaryRestrictionWhereInputObjectSchema),
      ])
      .optional(),
  })
  .strict();
export const UserDietaryRestrictionWhereInputObjectSchema: z.ZodType<Prisma.UserDietaryRestrictionWhereInput> =
  userdietaryrestrictionwhereinputSchema as unknown as z.ZodType<Prisma.UserDietaryRestrictionWhereInput>;
export const UserDietaryRestrictionWhereInputObjectZodSchema =
  userdietaryrestrictionwhereinputSchema;
