import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserDietaryRestrictionWhereInputObjectSchema as UserDietaryRestrictionWhereInputObjectSchema } from './UserDietaryRestrictionWhereInput.schema';

const makeSchema = () =>
  z
    .object({
      every: z
        .lazy(() => UserDietaryRestrictionWhereInputObjectSchema)
        .optional(),
      some: z
        .lazy(() => UserDietaryRestrictionWhereInputObjectSchema)
        .optional(),
      none: z
        .lazy(() => UserDietaryRestrictionWhereInputObjectSchema)
        .optional(),
    })
    .strict();
export const UserDietaryRestrictionListRelationFilterObjectSchema: z.ZodType<Prisma.UserDietaryRestrictionListRelationFilter> =
  makeSchema() as unknown as z.ZodType<Prisma.UserDietaryRestrictionListRelationFilter>;
export const UserDietaryRestrictionListRelationFilterObjectZodSchema =
  makeSchema();
