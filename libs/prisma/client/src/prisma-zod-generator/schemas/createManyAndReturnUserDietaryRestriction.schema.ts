import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { UserDietaryRestrictionSelectObjectSchema as UserDietaryRestrictionSelectObjectSchema } from './objects/UserDietaryRestrictionSelect.schema';
import { UserDietaryRestrictionCreateManyInputObjectSchema as UserDietaryRestrictionCreateManyInputObjectSchema } from './objects/UserDietaryRestrictionCreateManyInput.schema';

export const UserDietaryRestrictionCreateManyAndReturnSchema: z.ZodType<Prisma.UserDietaryRestrictionCreateManyAndReturnArgs> =
  z
    .object({
      select: UserDietaryRestrictionSelectObjectSchema.optional(),
      data: z.union([
        UserDietaryRestrictionCreateManyInputObjectSchema,
        z.array(UserDietaryRestrictionCreateManyInputObjectSchema),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict() as unknown as z.ZodType<Prisma.UserDietaryRestrictionCreateManyAndReturnArgs>;

export const UserDietaryRestrictionCreateManyAndReturnZodSchema = z
  .object({
    select: UserDietaryRestrictionSelectObjectSchema.optional(),
    data: z.union([
      UserDietaryRestrictionCreateManyInputObjectSchema,
      z.array(UserDietaryRestrictionCreateManyInputObjectSchema),
    ]),
    skipDuplicates: z.boolean().optional(),
  })
  .strict();
