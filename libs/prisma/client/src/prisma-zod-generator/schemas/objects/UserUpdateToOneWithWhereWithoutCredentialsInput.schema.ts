import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema';
import { UserUpdateWithoutCredentialsInputObjectSchema as UserUpdateWithoutCredentialsInputObjectSchema } from './UserUpdateWithoutCredentialsInput.schema';
import { UserUncheckedUpdateWithoutCredentialsInputObjectSchema as UserUncheckedUpdateWithoutCredentialsInputObjectSchema } from './UserUncheckedUpdateWithoutCredentialsInput.schema';

const makeSchema = () =>
  z
    .object({
      where: z.lazy(() => UserWhereInputObjectSchema).optional(),
      data: z.union([
        z.lazy(() => UserUpdateWithoutCredentialsInputObjectSchema),
        z.lazy(() => UserUncheckedUpdateWithoutCredentialsInputObjectSchema),
      ]),
    })
    .strict();
export const UserUpdateToOneWithWhereWithoutCredentialsInputObjectSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutCredentialsInput> =
  makeSchema() as unknown as z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutCredentialsInput>;
export const UserUpdateToOneWithWhereWithoutCredentialsInputObjectZodSchema =
  makeSchema();
