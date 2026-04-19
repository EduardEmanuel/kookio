import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserUpdateWithoutCookingSessionsInputObjectSchema as UserUpdateWithoutCookingSessionsInputObjectSchema } from './UserUpdateWithoutCookingSessionsInput.schema';
import { UserUncheckedUpdateWithoutCookingSessionsInputObjectSchema as UserUncheckedUpdateWithoutCookingSessionsInputObjectSchema } from './UserUncheckedUpdateWithoutCookingSessionsInput.schema';
import { UserCreateWithoutCookingSessionsInputObjectSchema as UserCreateWithoutCookingSessionsInputObjectSchema } from './UserCreateWithoutCookingSessionsInput.schema';
import { UserUncheckedCreateWithoutCookingSessionsInputObjectSchema as UserUncheckedCreateWithoutCookingSessionsInputObjectSchema } from './UserUncheckedCreateWithoutCookingSessionsInput.schema';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema';

const makeSchema = () =>
  z
    .object({
      update: z.union([
        z.lazy(() => UserUpdateWithoutCookingSessionsInputObjectSchema),
        z.lazy(
          () => UserUncheckedUpdateWithoutCookingSessionsInputObjectSchema,
        ),
      ]),
      create: z.union([
        z.lazy(() => UserCreateWithoutCookingSessionsInputObjectSchema),
        z.lazy(
          () => UserUncheckedCreateWithoutCookingSessionsInputObjectSchema,
        ),
      ]),
      where: z.lazy(() => UserWhereInputObjectSchema).optional(),
    })
    .strict();
export const UserUpsertWithoutCookingSessionsInputObjectSchema: z.ZodType<Prisma.UserUpsertWithoutCookingSessionsInput> =
  makeSchema() as unknown as z.ZodType<Prisma.UserUpsertWithoutCookingSessionsInput>;
export const UserUpsertWithoutCookingSessionsInputObjectZodSchema =
  makeSchema();
