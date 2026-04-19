import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema';
import { UserUpdateWithoutCookingSessionsInputObjectSchema as UserUpdateWithoutCookingSessionsInputObjectSchema } from './UserUpdateWithoutCookingSessionsInput.schema';
import { UserUncheckedUpdateWithoutCookingSessionsInputObjectSchema as UserUncheckedUpdateWithoutCookingSessionsInputObjectSchema } from './UserUncheckedUpdateWithoutCookingSessionsInput.schema';

const makeSchema = () =>
  z
    .object({
      where: z.lazy(() => UserWhereInputObjectSchema).optional(),
      data: z.union([
        z.lazy(() => UserUpdateWithoutCookingSessionsInputObjectSchema),
        z.lazy(
          () => UserUncheckedUpdateWithoutCookingSessionsInputObjectSchema,
        ),
      ]),
    })
    .strict();
export const UserUpdateToOneWithWhereWithoutCookingSessionsInputObjectSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutCookingSessionsInput> =
  makeSchema() as unknown as z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutCookingSessionsInput>;
export const UserUpdateToOneWithWhereWithoutCookingSessionsInputObjectZodSchema =
  makeSchema();
