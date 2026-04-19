import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserProfileArgsObjectSchema as UserProfileArgsObjectSchema } from './UserProfileArgs.schema';
import { DietaryRestrictionArgsObjectSchema as DietaryRestrictionArgsObjectSchema } from './DietaryRestrictionArgs.schema';

const makeSchema = () =>
  z
    .object({
      userId: z.boolean().optional(),
      dietaryRestrictionId: z.boolean().optional(),
      user: z
        .union([z.boolean(), z.lazy(() => UserProfileArgsObjectSchema)])
        .optional(),
      restriction: z
        .union([z.boolean(), z.lazy(() => DietaryRestrictionArgsObjectSchema)])
        .optional(),
    })
    .strict();
export const UserDietaryRestrictionSelectObjectSchema: z.ZodType<Prisma.UserDietaryRestrictionSelect> =
  makeSchema() as unknown as z.ZodType<Prisma.UserDietaryRestrictionSelect>;
export const UserDietaryRestrictionSelectObjectZodSchema = makeSchema();
