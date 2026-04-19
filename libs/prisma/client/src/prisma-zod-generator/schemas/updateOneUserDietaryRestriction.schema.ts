import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { UserDietaryRestrictionSelectObjectSchema as UserDietaryRestrictionSelectObjectSchema } from './objects/UserDietaryRestrictionSelect.schema';
import { UserDietaryRestrictionIncludeObjectSchema as UserDietaryRestrictionIncludeObjectSchema } from './objects/UserDietaryRestrictionInclude.schema';
import { UserDietaryRestrictionUpdateInputObjectSchema as UserDietaryRestrictionUpdateInputObjectSchema } from './objects/UserDietaryRestrictionUpdateInput.schema';
import { UserDietaryRestrictionUncheckedUpdateInputObjectSchema as UserDietaryRestrictionUncheckedUpdateInputObjectSchema } from './objects/UserDietaryRestrictionUncheckedUpdateInput.schema';
import { UserDietaryRestrictionWhereUniqueInputObjectSchema as UserDietaryRestrictionWhereUniqueInputObjectSchema } from './objects/UserDietaryRestrictionWhereUniqueInput.schema';

export const UserDietaryRestrictionUpdateOneSchema: z.ZodType<Prisma.UserDietaryRestrictionUpdateArgs> =
  z
    .object({
      select: UserDietaryRestrictionSelectObjectSchema.optional(),
      include: UserDietaryRestrictionIncludeObjectSchema.optional(),
      data: z.union([
        UserDietaryRestrictionUpdateInputObjectSchema,
        UserDietaryRestrictionUncheckedUpdateInputObjectSchema,
      ]),
      where: UserDietaryRestrictionWhereUniqueInputObjectSchema,
    })
    .strict() as unknown as z.ZodType<Prisma.UserDietaryRestrictionUpdateArgs>;

export const UserDietaryRestrictionUpdateOneZodSchema = z
  .object({
    select: UserDietaryRestrictionSelectObjectSchema.optional(),
    include: UserDietaryRestrictionIncludeObjectSchema.optional(),
    data: z.union([
      UserDietaryRestrictionUpdateInputObjectSchema,
      UserDietaryRestrictionUncheckedUpdateInputObjectSchema,
    ]),
    where: UserDietaryRestrictionWhereUniqueInputObjectSchema,
  })
  .strict();
