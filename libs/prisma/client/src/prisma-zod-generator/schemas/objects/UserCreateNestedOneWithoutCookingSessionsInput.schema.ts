import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserCreateWithoutCookingSessionsInputObjectSchema as UserCreateWithoutCookingSessionsInputObjectSchema } from './UserCreateWithoutCookingSessionsInput.schema';
import { UserUncheckedCreateWithoutCookingSessionsInputObjectSchema as UserUncheckedCreateWithoutCookingSessionsInputObjectSchema } from './UserUncheckedCreateWithoutCookingSessionsInput.schema';
import { UserCreateOrConnectWithoutCookingSessionsInputObjectSchema as UserCreateOrConnectWithoutCookingSessionsInputObjectSchema } from './UserCreateOrConnectWithoutCookingSessionsInput.schema';
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';

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
      connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional(),
    })
    .strict();
export const UserCreateNestedOneWithoutCookingSessionsInputObjectSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutCookingSessionsInput> =
  makeSchema() as unknown as z.ZodType<Prisma.UserCreateNestedOneWithoutCookingSessionsInput>;
export const UserCreateNestedOneWithoutCookingSessionsInputObjectZodSchema =
  makeSchema();
