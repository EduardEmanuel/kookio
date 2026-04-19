import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserArgsObjectSchema as UserArgsObjectSchema } from './UserArgs.schema';
import { UserDietaryRestrictionFindManySchema as UserDietaryRestrictionFindManySchema } from '../findManyUserDietaryRestriction.schema';
import { UserUtensilFindManySchema as UserUtensilFindManySchema } from '../findManyUserUtensil.schema';
import { UserProfileCountOutputTypeArgsObjectSchema as UserProfileCountOutputTypeArgsObjectSchema } from './UserProfileCountOutputTypeArgs.schema';

const makeSchema = () =>
  z
    .object({
      id: z.boolean().optional(),
      userId: z.boolean().optional(),
      adultsCount: z.boolean().optional(),
      childrenCount: z.boolean().optional(),
      onboardingDone: z.boolean().optional(),
      createdAt: z.boolean().optional(),
      updatedAt: z.boolean().optional(),
      user: z
        .union([z.boolean(), z.lazy(() => UserArgsObjectSchema)])
        .optional(),
      dietaryRestrictions: z
        .union([
          z.boolean(),
          z.lazy(() => UserDietaryRestrictionFindManySchema),
        ])
        .optional(),
      utensils: z
        .union([z.boolean(), z.lazy(() => UserUtensilFindManySchema)])
        .optional(),
      _count: z
        .union([
          z.boolean(),
          z.lazy(() => UserProfileCountOutputTypeArgsObjectSchema),
        ])
        .optional(),
    })
    .strict();
export const UserProfileSelectObjectSchema: z.ZodType<Prisma.UserProfileSelect> =
  makeSchema() as unknown as z.ZodType<Prisma.UserProfileSelect>;
export const UserProfileSelectObjectZodSchema = makeSchema();
