import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { UserUtensilSelectObjectSchema as UserUtensilSelectObjectSchema } from './objects/UserUtensilSelect.schema';
import { UserUtensilCreateManyInputObjectSchema as UserUtensilCreateManyInputObjectSchema } from './objects/UserUtensilCreateManyInput.schema';

export const UserUtensilCreateManyAndReturnSchema: z.ZodType<Prisma.UserUtensilCreateManyAndReturnArgs> =
  z
    .object({
      select: UserUtensilSelectObjectSchema.optional(),
      data: z.union([
        UserUtensilCreateManyInputObjectSchema,
        z.array(UserUtensilCreateManyInputObjectSchema),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict() as unknown as z.ZodType<Prisma.UserUtensilCreateManyAndReturnArgs>;

export const UserUtensilCreateManyAndReturnZodSchema = z
  .object({
    select: UserUtensilSelectObjectSchema.optional(),
    data: z.union([
      UserUtensilCreateManyInputObjectSchema,
      z.array(UserUtensilCreateManyInputObjectSchema),
    ]),
    skipDuplicates: z.boolean().optional(),
  })
  .strict();
