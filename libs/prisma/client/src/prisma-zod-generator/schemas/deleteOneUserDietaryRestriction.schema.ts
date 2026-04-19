import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { UserDietaryRestrictionSelectObjectSchema as UserDietaryRestrictionSelectObjectSchema } from './objects/UserDietaryRestrictionSelect.schema';
import { UserDietaryRestrictionIncludeObjectSchema as UserDietaryRestrictionIncludeObjectSchema } from './objects/UserDietaryRestrictionInclude.schema';
import { UserDietaryRestrictionWhereUniqueInputObjectSchema as UserDietaryRestrictionWhereUniqueInputObjectSchema } from './objects/UserDietaryRestrictionWhereUniqueInput.schema';

export const UserDietaryRestrictionDeleteOneSchema: z.ZodType<Prisma.UserDietaryRestrictionDeleteArgs> =
  z
    .object({
      select: UserDietaryRestrictionSelectObjectSchema.optional(),
      include: UserDietaryRestrictionIncludeObjectSchema.optional(),
      where: UserDietaryRestrictionWhereUniqueInputObjectSchema,
    })
    .strict() as unknown as z.ZodType<Prisma.UserDietaryRestrictionDeleteArgs>;

export const UserDietaryRestrictionDeleteOneZodSchema = z
  .object({
    select: UserDietaryRestrictionSelectObjectSchema.optional(),
    include: UserDietaryRestrictionIncludeObjectSchema.optional(),
    where: UserDietaryRestrictionWhereUniqueInputObjectSchema,
  })
  .strict();
