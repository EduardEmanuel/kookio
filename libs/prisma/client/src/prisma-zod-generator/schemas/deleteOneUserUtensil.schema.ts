import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { UserUtensilSelectObjectSchema as UserUtensilSelectObjectSchema } from './objects/UserUtensilSelect.schema';
import { UserUtensilIncludeObjectSchema as UserUtensilIncludeObjectSchema } from './objects/UserUtensilInclude.schema';
import { UserUtensilWhereUniqueInputObjectSchema as UserUtensilWhereUniqueInputObjectSchema } from './objects/UserUtensilWhereUniqueInput.schema';

export const UserUtensilDeleteOneSchema: z.ZodType<Prisma.UserUtensilDeleteArgs> =
  z
    .object({
      select: UserUtensilSelectObjectSchema.optional(),
      include: UserUtensilIncludeObjectSchema.optional(),
      where: UserUtensilWhereUniqueInputObjectSchema,
    })
    .strict() as unknown as z.ZodType<Prisma.UserUtensilDeleteArgs>;

export const UserUtensilDeleteOneZodSchema = z
  .object({
    select: UserUtensilSelectObjectSchema.optional(),
    include: UserUtensilIncludeObjectSchema.optional(),
    where: UserUtensilWhereUniqueInputObjectSchema,
  })
  .strict();
