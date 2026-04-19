import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserDietaryRestrictionFindManySchema as UserDietaryRestrictionFindManySchema } from '../findManyUserDietaryRestriction.schema';
import { DietaryRestrictionCountOutputTypeArgsObjectSchema as DietaryRestrictionCountOutputTypeArgsObjectSchema } from './DietaryRestrictionCountOutputTypeArgs.schema';

const makeSchema = () =>
  z
    .object({
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
export const DietaryRestrictionIncludeObjectSchema: z.ZodType<Prisma.DietaryRestrictionInclude> =
  makeSchema() as unknown as z.ZodType<Prisma.DietaryRestrictionInclude>;
export const DietaryRestrictionIncludeObjectZodSchema = makeSchema();
