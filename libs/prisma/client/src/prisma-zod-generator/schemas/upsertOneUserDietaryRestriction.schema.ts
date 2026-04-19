import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { UserDietaryRestrictionSelectObjectSchema as UserDietaryRestrictionSelectObjectSchema } from './objects/UserDietaryRestrictionSelect.schema';
import { UserDietaryRestrictionIncludeObjectSchema as UserDietaryRestrictionIncludeObjectSchema } from './objects/UserDietaryRestrictionInclude.schema';
import { UserDietaryRestrictionWhereUniqueInputObjectSchema as UserDietaryRestrictionWhereUniqueInputObjectSchema } from './objects/UserDietaryRestrictionWhereUniqueInput.schema';
import { UserDietaryRestrictionCreateInputObjectSchema as UserDietaryRestrictionCreateInputObjectSchema } from './objects/UserDietaryRestrictionCreateInput.schema';
import { UserDietaryRestrictionUncheckedCreateInputObjectSchema as UserDietaryRestrictionUncheckedCreateInputObjectSchema } from './objects/UserDietaryRestrictionUncheckedCreateInput.schema';
import { UserDietaryRestrictionUpdateInputObjectSchema as UserDietaryRestrictionUpdateInputObjectSchema } from './objects/UserDietaryRestrictionUpdateInput.schema';
import { UserDietaryRestrictionUncheckedUpdateInputObjectSchema as UserDietaryRestrictionUncheckedUpdateInputObjectSchema } from './objects/UserDietaryRestrictionUncheckedUpdateInput.schema';

export const UserDietaryRestrictionUpsertOneSchema: z.ZodType<Prisma.UserDietaryRestrictionUpsertArgs> =
  z
    .object({
      select: UserDietaryRestrictionSelectObjectSchema.optional(),
      include: UserDietaryRestrictionIncludeObjectSchema.optional(),
      where: UserDietaryRestrictionWhereUniqueInputObjectSchema,
      create: z.union([
        UserDietaryRestrictionCreateInputObjectSchema,
        UserDietaryRestrictionUncheckedCreateInputObjectSchema,
      ]),
      update: z.union([
        UserDietaryRestrictionUpdateInputObjectSchema,
        UserDietaryRestrictionUncheckedUpdateInputObjectSchema,
      ]),
    })
    .strict() as unknown as z.ZodType<Prisma.UserDietaryRestrictionUpsertArgs>;

export const UserDietaryRestrictionUpsertOneZodSchema = z
  .object({
    select: UserDietaryRestrictionSelectObjectSchema.optional(),
    include: UserDietaryRestrictionIncludeObjectSchema.optional(),
    where: UserDietaryRestrictionWhereUniqueInputObjectSchema,
    create: z.union([
      UserDietaryRestrictionCreateInputObjectSchema,
      UserDietaryRestrictionUncheckedCreateInputObjectSchema,
    ]),
    update: z.union([
      UserDietaryRestrictionUpdateInputObjectSchema,
      UserDietaryRestrictionUncheckedUpdateInputObjectSchema,
    ]),
  })
  .strict();
