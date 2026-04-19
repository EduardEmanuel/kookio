import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { UserDietaryRestrictionSelectObjectSchema as UserDietaryRestrictionSelectObjectSchema } from './objects/UserDietaryRestrictionSelect.schema';
import { UserDietaryRestrictionIncludeObjectSchema as UserDietaryRestrictionIncludeObjectSchema } from './objects/UserDietaryRestrictionInclude.schema';
import { UserDietaryRestrictionCreateInputObjectSchema as UserDietaryRestrictionCreateInputObjectSchema } from './objects/UserDietaryRestrictionCreateInput.schema';
import { UserDietaryRestrictionUncheckedCreateInputObjectSchema as UserDietaryRestrictionUncheckedCreateInputObjectSchema } from './objects/UserDietaryRestrictionUncheckedCreateInput.schema';

export const UserDietaryRestrictionCreateOneSchema: z.ZodType<Prisma.UserDietaryRestrictionCreateArgs> =
  z
    .object({
      select: UserDietaryRestrictionSelectObjectSchema.optional(),
      include: UserDietaryRestrictionIncludeObjectSchema.optional(),
      data: z.union([
        UserDietaryRestrictionCreateInputObjectSchema,
        UserDietaryRestrictionUncheckedCreateInputObjectSchema,
      ]),
    })
    .strict() as unknown as z.ZodType<Prisma.UserDietaryRestrictionCreateArgs>;

export const UserDietaryRestrictionCreateOneZodSchema = z
  .object({
    select: UserDietaryRestrictionSelectObjectSchema.optional(),
    include: UserDietaryRestrictionIncludeObjectSchema.optional(),
    data: z.union([
      UserDietaryRestrictionCreateInputObjectSchema,
      UserDietaryRestrictionUncheckedCreateInputObjectSchema,
    ]),
  })
  .strict();
