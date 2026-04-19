import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserCreateWithoutCookingSessionsInputObjectSchema as UserCreateWithoutCookingSessionsInputObjectSchema } from './UserCreateWithoutCookingSessionsInput.schema';
import { UserUncheckedCreateWithoutCookingSessionsInputObjectSchema as UserUncheckedCreateWithoutCookingSessionsInputObjectSchema } from './UserUncheckedCreateWithoutCookingSessionsInput.schema';

const makeSchema = () =>
  z
    .object({
      where: z.lazy(() => UserWhereUniqueInputObjectSchema),
      create: z.union([
        z.lazy(() => UserCreateWithoutCookingSessionsInputObjectSchema),
        z.lazy(
          () => UserUncheckedCreateWithoutCookingSessionsInputObjectSchema,
        ),
      ]),
    })
    .strict();
export const UserCreateOrConnectWithoutCookingSessionsInputObjectSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutCookingSessionsInput> =
  makeSchema() as unknown as z.ZodType<Prisma.UserCreateOrConnectWithoutCookingSessionsInput>;
export const UserCreateOrConnectWithoutCookingSessionsInputObjectZodSchema =
  makeSchema();
