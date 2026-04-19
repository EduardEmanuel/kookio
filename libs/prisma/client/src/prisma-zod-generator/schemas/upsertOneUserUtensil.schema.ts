import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { UserUtensilSelectObjectSchema as UserUtensilSelectObjectSchema } from './objects/UserUtensilSelect.schema';
import { UserUtensilIncludeObjectSchema as UserUtensilIncludeObjectSchema } from './objects/UserUtensilInclude.schema';
import { UserUtensilWhereUniqueInputObjectSchema as UserUtensilWhereUniqueInputObjectSchema } from './objects/UserUtensilWhereUniqueInput.schema';
import { UserUtensilCreateInputObjectSchema as UserUtensilCreateInputObjectSchema } from './objects/UserUtensilCreateInput.schema';
import { UserUtensilUncheckedCreateInputObjectSchema as UserUtensilUncheckedCreateInputObjectSchema } from './objects/UserUtensilUncheckedCreateInput.schema';
import { UserUtensilUpdateInputObjectSchema as UserUtensilUpdateInputObjectSchema } from './objects/UserUtensilUpdateInput.schema';
import { UserUtensilUncheckedUpdateInputObjectSchema as UserUtensilUncheckedUpdateInputObjectSchema } from './objects/UserUtensilUncheckedUpdateInput.schema';

export const UserUtensilUpsertOneSchema: z.ZodType<Prisma.UserUtensilUpsertArgs> =
  z
    .object({
      select: UserUtensilSelectObjectSchema.optional(),
      include: UserUtensilIncludeObjectSchema.optional(),
      where: UserUtensilWhereUniqueInputObjectSchema,
      create: z.union([
        UserUtensilCreateInputObjectSchema,
        UserUtensilUncheckedCreateInputObjectSchema,
      ]),
      update: z.union([
        UserUtensilUpdateInputObjectSchema,
        UserUtensilUncheckedUpdateInputObjectSchema,
      ]),
    })
    .strict() as unknown as z.ZodType<Prisma.UserUtensilUpsertArgs>;

export const UserUtensilUpsertOneZodSchema = z
  .object({
    select: UserUtensilSelectObjectSchema.optional(),
    include: UserUtensilIncludeObjectSchema.optional(),
    where: UserUtensilWhereUniqueInputObjectSchema,
    create: z.union([
      UserUtensilCreateInputObjectSchema,
      UserUtensilUncheckedCreateInputObjectSchema,
    ]),
    update: z.union([
      UserUtensilUpdateInputObjectSchema,
      UserUtensilUncheckedUpdateInputObjectSchema,
    ]),
  })
  .strict();
