import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { UserUtensilCreateManyInputObjectSchema as UserUtensilCreateManyInputObjectSchema } from './objects/UserUtensilCreateManyInput.schema';

export const UserUtensilCreateManySchema: z.ZodType<Prisma.UserUtensilCreateManyArgs> =
  z
    .object({
      data: z.union([
        UserUtensilCreateManyInputObjectSchema,
        z.array(UserUtensilCreateManyInputObjectSchema),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict() as unknown as z.ZodType<Prisma.UserUtensilCreateManyArgs>;

export const UserUtensilCreateManyZodSchema = z
  .object({
    data: z.union([
      UserUtensilCreateManyInputObjectSchema,
      z.array(UserUtensilCreateManyInputObjectSchema),
    ]),
    skipDuplicates: z.boolean().optional(),
  })
  .strict();
