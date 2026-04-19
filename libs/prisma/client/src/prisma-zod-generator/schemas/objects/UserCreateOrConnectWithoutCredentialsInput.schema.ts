import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserCreateWithoutCredentialsInputObjectSchema as UserCreateWithoutCredentialsInputObjectSchema } from './UserCreateWithoutCredentialsInput.schema';
import { UserUncheckedCreateWithoutCredentialsInputObjectSchema as UserUncheckedCreateWithoutCredentialsInputObjectSchema } from './UserUncheckedCreateWithoutCredentialsInput.schema';

const makeSchema = () =>
  z
    .object({
      where: z.lazy(() => UserWhereUniqueInputObjectSchema),
      create: z.union([
        z.lazy(() => UserCreateWithoutCredentialsInputObjectSchema),
        z.lazy(() => UserUncheckedCreateWithoutCredentialsInputObjectSchema),
      ]),
    })
    .strict();
export const UserCreateOrConnectWithoutCredentialsInputObjectSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutCredentialsInput> =
  makeSchema() as unknown as z.ZodType<Prisma.UserCreateOrConnectWithoutCredentialsInput>;
export const UserCreateOrConnectWithoutCredentialsInputObjectZodSchema =
  makeSchema();
