import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserCreateWithoutCredentialsInputObjectSchema as UserCreateWithoutCredentialsInputObjectSchema } from './UserCreateWithoutCredentialsInput.schema';
import { UserUncheckedCreateWithoutCredentialsInputObjectSchema as UserUncheckedCreateWithoutCredentialsInputObjectSchema } from './UserUncheckedCreateWithoutCredentialsInput.schema';
import { UserCreateOrConnectWithoutCredentialsInputObjectSchema as UserCreateOrConnectWithoutCredentialsInputObjectSchema } from './UserCreateOrConnectWithoutCredentialsInput.schema';
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';

const makeSchema = () =>
  z
    .object({
      create: z
        .union([
          z.lazy(() => UserCreateWithoutCredentialsInputObjectSchema),
          z.lazy(() => UserUncheckedCreateWithoutCredentialsInputObjectSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => UserCreateOrConnectWithoutCredentialsInputObjectSchema)
        .optional(),
      connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional(),
    })
    .strict();
export const UserCreateNestedOneWithoutCredentialsInputObjectSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutCredentialsInput> =
  makeSchema() as unknown as z.ZodType<Prisma.UserCreateNestedOneWithoutCredentialsInput>;
export const UserCreateNestedOneWithoutCredentialsInputObjectZodSchema =
  makeSchema();
