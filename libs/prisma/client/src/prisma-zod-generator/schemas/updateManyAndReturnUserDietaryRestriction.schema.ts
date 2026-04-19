import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { UserDietaryRestrictionSelectObjectSchema as UserDietaryRestrictionSelectObjectSchema } from './objects/UserDietaryRestrictionSelect.schema';
import { UserDietaryRestrictionUpdateManyMutationInputObjectSchema as UserDietaryRestrictionUpdateManyMutationInputObjectSchema } from './objects/UserDietaryRestrictionUpdateManyMutationInput.schema';
import { UserDietaryRestrictionWhereInputObjectSchema as UserDietaryRestrictionWhereInputObjectSchema } from './objects/UserDietaryRestrictionWhereInput.schema';

export const UserDietaryRestrictionUpdateManyAndReturnSchema: z.ZodType<Prisma.UserDietaryRestrictionUpdateManyAndReturnArgs> =
  z
    .object({
      select: UserDietaryRestrictionSelectObjectSchema.optional(),
      data: UserDietaryRestrictionUpdateManyMutationInputObjectSchema,
      where: UserDietaryRestrictionWhereInputObjectSchema.optional(),
    })
    .strict() as unknown as z.ZodType<Prisma.UserDietaryRestrictionUpdateManyAndReturnArgs>;

export const UserDietaryRestrictionUpdateManyAndReturnZodSchema = z
  .object({
    select: UserDietaryRestrictionSelectObjectSchema.optional(),
    data: UserDietaryRestrictionUpdateManyMutationInputObjectSchema,
    where: UserDietaryRestrictionWhereInputObjectSchema.optional(),
  })
  .strict();
