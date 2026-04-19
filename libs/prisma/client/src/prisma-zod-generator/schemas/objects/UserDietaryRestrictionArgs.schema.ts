import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserDietaryRestrictionSelectObjectSchema as UserDietaryRestrictionSelectObjectSchema } from './UserDietaryRestrictionSelect.schema';
import { UserDietaryRestrictionIncludeObjectSchema as UserDietaryRestrictionIncludeObjectSchema } from './UserDietaryRestrictionInclude.schema';

const makeSchema = () =>
  z
    .object({
      select: z.lazy(() => UserDietaryRestrictionSelectObjectSchema).optional(),
      include: z
        .lazy(() => UserDietaryRestrictionIncludeObjectSchema)
        .optional(),
    })
    .strict();
export const UserDietaryRestrictionArgsObjectSchema = makeSchema();
export const UserDietaryRestrictionArgsObjectZodSchema = makeSchema();
