import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserCreateWithoutCredentialsInputObjectSchema as UserCreateWithoutCredentialsInputObjectSchema } from './UserCreateWithoutCredentialsInput.schema';
import { UserUncheckedCreateWithoutCredentialsInputObjectSchema as UserUncheckedCreateWithoutCredentialsInputObjectSchema } from './UserUncheckedCreateWithoutCredentialsInput.schema';
import { UserCreateOrConnectWithoutCredentialsInputObjectSchema as UserCreateOrConnectWithoutCredentialsInputObjectSchema } from './UserCreateOrConnectWithoutCredentialsInput.schema';
import { UserUpsertWithoutCredentialsInputObjectSchema as UserUpsertWithoutCredentialsInputObjectSchema } from './UserUpsertWithoutCredentialsInput.schema';
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserUpdateToOneWithWhereWithoutCredentialsInputObjectSchema as UserUpdateToOneWithWhereWithoutCredentialsInputObjectSchema } from './UserUpdateToOneWithWhereWithoutCredentialsInput.schema';
import { UserUpdateWithoutCredentialsInputObjectSchema as UserUpdateWithoutCredentialsInputObjectSchema } from './UserUpdateWithoutCredentialsInput.schema';
import { UserUncheckedUpdateWithoutCredentialsInputObjectSchema as UserUncheckedUpdateWithoutCredentialsInputObjectSchema } from './UserUncheckedUpdateWithoutCredentialsInput.schema';

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
      upsert: z
        .lazy(() => UserUpsertWithoutCredentialsInputObjectSchema)
        .optional(),
      connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional(),
      update: z
        .union([
          z.lazy(
            () => UserUpdateToOneWithWhereWithoutCredentialsInputObjectSchema,
          ),
          z.lazy(() => UserUpdateWithoutCredentialsInputObjectSchema),
          z.lazy(() => UserUncheckedUpdateWithoutCredentialsInputObjectSchema),
        ])
        .optional(),
    })
    .strict();
export const UserUpdateOneRequiredWithoutCredentialsNestedInputObjectSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutCredentialsNestedInput> =
  makeSchema() as unknown as z.ZodType<Prisma.UserUpdateOneRequiredWithoutCredentialsNestedInput>;
export const UserUpdateOneRequiredWithoutCredentialsNestedInputObjectZodSchema =
  makeSchema();
