import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserProfileArgsObjectSchema as UserProfileArgsObjectSchema } from './UserProfileArgs.schema';
import { DietaryRestrictionArgsObjectSchema as DietaryRestrictionArgsObjectSchema } from './DietaryRestrictionArgs.schema';

const makeSchema = () =>
  z
    .object({
      user: z
        .union([z.boolean(), z.lazy(() => UserProfileArgsObjectSchema)])
        .optional(),
      restriction: z
        .union([z.boolean(), z.lazy(() => DietaryRestrictionArgsObjectSchema)])
        .optional(),
    })
    .strict();
export const UserDietaryRestrictionIncludeObjectSchema: z.ZodType<Prisma.UserDietaryRestrictionInclude> =
  makeSchema() as unknown as z.ZodType<Prisma.UserDietaryRestrictionInclude>;
export const UserDietaryRestrictionIncludeObjectZodSchema = makeSchema();
