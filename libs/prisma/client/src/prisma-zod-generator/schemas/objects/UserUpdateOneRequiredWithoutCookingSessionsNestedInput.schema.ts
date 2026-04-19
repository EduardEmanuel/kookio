import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserCreateWithoutCookingSessionsInputObjectSchema as UserCreateWithoutCookingSessionsInputObjectSchema } from './UserCreateWithoutCookingSessionsInput.schema';
import { UserUncheckedCreateWithoutCookingSessionsInputObjectSchema as UserUncheckedCreateWithoutCookingSessionsInputObjectSchema } from './UserUncheckedCreateWithoutCookingSessionsInput.schema';
import { UserCreateOrConnectWithoutCookingSessionsInputObjectSchema as UserCreateOrConnectWithoutCookingSessionsInputObjectSchema } from './UserCreateOrConnectWithoutCookingSessionsInput.schema';
import { UserUpsertWithoutCookingSessionsInputObjectSchema as UserUpsertWithoutCookingSessionsInputObjectSchema } from './UserUpsertWithoutCookingSessionsInput.schema';
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserUpdateToOneWithWhereWithoutCookingSessionsInputObjectSchema as UserUpdateToOneWithWhereWithoutCookingSessionsInputObjectSchema } from './UserUpdateToOneWithWhereWithoutCookingSessionsInput.schema';
import { UserUpdateWithoutCookingSessionsInputObjectSchema as UserUpdateWithoutCookingSessionsInputObjectSchema } from './UserUpdateWithoutCookingSessionsInput.schema';
import { UserUncheckedUpdateWithoutCookingSessionsInputObjectSchema as UserUncheckedUpdateWithoutCookingSessionsInputObjectSchema } from './UserUncheckedUpdateWithoutCookingSessionsInput.schema';

const makeSchema = () =>
  z
    .object({
      create: z
        .union([
          z.lazy(() => UserCreateWithoutCookingSessionsInputObjectSchema),
          z.lazy(
            () => UserUncheckedCreateWithoutCookingSessionsInputObjectSchema,
          ),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => UserCreateOrConnectWithoutCookingSessionsInputObjectSchema)
        .optional(),
      upsert: z
        .lazy(() => UserUpsertWithoutCookingSessionsInputObjectSchema)
        .optional(),
      connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional(),
      update: z
        .union([
          z.lazy(
            () =>
              UserUpdateToOneWithWhereWithoutCookingSessionsInputObjectSchema,
          ),
          z.lazy(() => UserUpdateWithoutCookingSessionsInputObjectSchema),
          z.lazy(
            () => UserUncheckedUpdateWithoutCookingSessionsInputObjectSchema,
          ),
        ])
        .optional(),
    })
    .strict();
export const UserUpdateOneRequiredWithoutCookingSessionsNestedInputObjectSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutCookingSessionsNestedInput> =
  makeSchema() as unknown as z.ZodType<Prisma.UserUpdateOneRequiredWithoutCookingSessionsNestedInput>;
export const UserUpdateOneRequiredWithoutCookingSessionsNestedInputObjectZodSchema =
  makeSchema();
