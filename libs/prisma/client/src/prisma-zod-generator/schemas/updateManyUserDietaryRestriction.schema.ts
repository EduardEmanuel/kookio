import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { UserDietaryRestrictionUpdateManyMutationInputObjectSchema as UserDietaryRestrictionUpdateManyMutationInputObjectSchema } from './objects/UserDietaryRestrictionUpdateManyMutationInput.schema';
import { UserDietaryRestrictionWhereInputObjectSchema as UserDietaryRestrictionWhereInputObjectSchema } from './objects/UserDietaryRestrictionWhereInput.schema';

export const UserDietaryRestrictionUpdateManySchema: z.ZodType<Prisma.UserDietaryRestrictionUpdateManyArgs> =
  z
    .object({
      data: UserDietaryRestrictionUpdateManyMutationInputObjectSchema,
      where: UserDietaryRestrictionWhereInputObjectSchema.optional(),
    })
    .strict() as unknown as z.ZodType<Prisma.UserDietaryRestrictionUpdateManyArgs>;

export const UserDietaryRestrictionUpdateManyZodSchema = z
  .object({
    data: UserDietaryRestrictionUpdateManyMutationInputObjectSchema,
    where: UserDietaryRestrictionWhereInputObjectSchema.optional(),
  })
  .strict();
