import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserUpdateWithoutCredentialsInputObjectSchema as UserUpdateWithoutCredentialsInputObjectSchema } from './UserUpdateWithoutCredentialsInput.schema';
import { UserUncheckedUpdateWithoutCredentialsInputObjectSchema as UserUncheckedUpdateWithoutCredentialsInputObjectSchema } from './UserUncheckedUpdateWithoutCredentialsInput.schema';
import { UserCreateWithoutCredentialsInputObjectSchema as UserCreateWithoutCredentialsInputObjectSchema } from './UserCreateWithoutCredentialsInput.schema';
import { UserUncheckedCreateWithoutCredentialsInputObjectSchema as UserUncheckedCreateWithoutCredentialsInputObjectSchema } from './UserUncheckedCreateWithoutCredentialsInput.schema';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema';

const makeSchema = () =>
  z
    .object({
      update: z.union([
        z.lazy(() => UserUpdateWithoutCredentialsInputObjectSchema),
        z.lazy(() => UserUncheckedUpdateWithoutCredentialsInputObjectSchema),
      ]),
      create: z.union([
        z.lazy(() => UserCreateWithoutCredentialsInputObjectSchema),
        z.lazy(() => UserUncheckedCreateWithoutCredentialsInputObjectSchema),
      ]),
      where: z.lazy(() => UserWhereInputObjectSchema).optional(),
    })
    .strict();
export const UserUpsertWithoutCredentialsInputObjectSchema: z.ZodType<Prisma.UserUpsertWithoutCredentialsInput> =
  makeSchema() as unknown as z.ZodType<Prisma.UserUpsertWithoutCredentialsInput>;
export const UserUpsertWithoutCredentialsInputObjectZodSchema = makeSchema();
