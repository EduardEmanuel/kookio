import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { UserUtensilSelectObjectSchema as UserUtensilSelectObjectSchema } from './objects/UserUtensilSelect.schema';
import { UserUtensilIncludeObjectSchema as UserUtensilIncludeObjectSchema } from './objects/UserUtensilInclude.schema';
import { UserUtensilUpdateInputObjectSchema as UserUtensilUpdateInputObjectSchema } from './objects/UserUtensilUpdateInput.schema';
import { UserUtensilUncheckedUpdateInputObjectSchema as UserUtensilUncheckedUpdateInputObjectSchema } from './objects/UserUtensilUncheckedUpdateInput.schema';
import { UserUtensilWhereUniqueInputObjectSchema as UserUtensilWhereUniqueInputObjectSchema } from './objects/UserUtensilWhereUniqueInput.schema';

export const UserUtensilUpdateOneSchema: z.ZodType<Prisma.UserUtensilUpdateArgs> =
  z
    .object({
      select: UserUtensilSelectObjectSchema.optional(),
      include: UserUtensilIncludeObjectSchema.optional(),
      data: z.union([
        UserUtensilUpdateInputObjectSchema,
        UserUtensilUncheckedUpdateInputObjectSchema,
      ]),
      where: UserUtensilWhereUniqueInputObjectSchema,
    })
    .strict() as unknown as z.ZodType<Prisma.UserUtensilUpdateArgs>;

export const UserUtensilUpdateOneZodSchema = z
  .object({
    select: UserUtensilSelectObjectSchema.optional(),
    include: UserUtensilIncludeObjectSchema.optional(),
    data: z.union([
      UserUtensilUpdateInputObjectSchema,
      UserUtensilUncheckedUpdateInputObjectSchema,
    ]),
    where: UserUtensilWhereUniqueInputObjectSchema,
  })
  .strict();
