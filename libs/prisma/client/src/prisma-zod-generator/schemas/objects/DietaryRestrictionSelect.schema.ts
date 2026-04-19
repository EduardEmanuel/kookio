import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserDietaryRestrictionFindManySchema as UserDietaryRestrictionFindManySchema } from '../findManyUserDietaryRestriction.schema';
import { DietaryRestrictionCountOutputTypeArgsObjectSchema as DietaryRestrictionCountOutputTypeArgsObjectSchema } from './DietaryRestrictionCountOutputTypeArgs.schema';

const makeSchema = () =>
  z
    .object({
      id: z.boolean().optional(),
      slug: z.boolean().optional(),
      label: z.boolean().optional(),
      emoji: z.boolean().optional(),
      description: z.boolean().optional(),
      users: z
        .union([
          z.boolean(),
          z.lazy(() => UserDietaryRestrictionFindManySchema),
        ])
        .optional(),
      _count: z
        .union([
          z.boolean(),
          z.lazy(() => DietaryRestrictionCountOutputTypeArgsObjectSchema),
        ])
        .optional(),
    })
    .strict();
export const DietaryRestrictionSelectObjectSchema: z.ZodType<Prisma.DietaryRestrictionSelect> =
  makeSchema() as unknown as z.ZodType<Prisma.DietaryRestrictionSelect>;
export const DietaryRestrictionSelectObjectZodSchema = makeSchema();
