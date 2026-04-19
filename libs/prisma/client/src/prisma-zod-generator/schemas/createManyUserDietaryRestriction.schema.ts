import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { UserDietaryRestrictionCreateManyInputObjectSchema as UserDietaryRestrictionCreateManyInputObjectSchema } from './objects/UserDietaryRestrictionCreateManyInput.schema';

export const UserDietaryRestrictionCreateManySchema: z.ZodType<Prisma.UserDietaryRestrictionCreateManyArgs> =
  z
    .object({
      data: z.union([
        UserDietaryRestrictionCreateManyInputObjectSchema,
        z.array(UserDietaryRestrictionCreateManyInputObjectSchema),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict() as unknown as z.ZodType<Prisma.UserDietaryRestrictionCreateManyArgs>;

export const UserDietaryRestrictionCreateManyZodSchema = z
  .object({
    data: z.union([
      UserDietaryRestrictionCreateManyInputObjectSchema,
      z.array(UserDietaryRestrictionCreateManyInputObjectSchema),
    ]),
    skipDuplicates: z.boolean().optional(),
  })
  .strict();
