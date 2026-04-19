import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { UserDietaryRestrictionWhereInputObjectSchema as UserDietaryRestrictionWhereInputObjectSchema } from './objects/UserDietaryRestrictionWhereInput.schema';

export const UserDietaryRestrictionDeleteManySchema: z.ZodType<Prisma.UserDietaryRestrictionDeleteManyArgs> =
  z
    .object({ where: UserDietaryRestrictionWhereInputObjectSchema.optional() })
    .strict() as unknown as z.ZodType<Prisma.UserDietaryRestrictionDeleteManyArgs>;

export const UserDietaryRestrictionDeleteManyZodSchema = z
  .object({ where: UserDietaryRestrictionWhereInputObjectSchema.optional() })
  .strict();
