import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { UserUtensilSelectObjectSchema as UserUtensilSelectObjectSchema } from './objects/UserUtensilSelect.schema';
import { UserUtensilIncludeObjectSchema as UserUtensilIncludeObjectSchema } from './objects/UserUtensilInclude.schema';
import { UserUtensilCreateInputObjectSchema as UserUtensilCreateInputObjectSchema } from './objects/UserUtensilCreateInput.schema';
import { UserUtensilUncheckedCreateInputObjectSchema as UserUtensilUncheckedCreateInputObjectSchema } from './objects/UserUtensilUncheckedCreateInput.schema';

export const UserUtensilCreateOneSchema: z.ZodType<Prisma.UserUtensilCreateArgs> =
  z
    .object({
      select: UserUtensilSelectObjectSchema.optional(),
      include: UserUtensilIncludeObjectSchema.optional(),
      data: z.union([
        UserUtensilCreateInputObjectSchema,
        UserUtensilUncheckedCreateInputObjectSchema,
      ]),
    })
    .strict() as unknown as z.ZodType<Prisma.UserUtensilCreateArgs>;

export const UserUtensilCreateOneZodSchema = z
  .object({
    select: UserUtensilSelectObjectSchema.optional(),
    include: UserUtensilIncludeObjectSchema.optional(),
    data: z.union([
      UserUtensilCreateInputObjectSchema,
      UserUtensilUncheckedCreateInputObjectSchema,
    ]),
  })
  .strict();
