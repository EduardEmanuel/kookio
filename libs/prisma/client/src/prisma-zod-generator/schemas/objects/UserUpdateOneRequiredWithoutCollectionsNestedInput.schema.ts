import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserCreateWithoutCollectionsInputObjectSchema as UserCreateWithoutCollectionsInputObjectSchema } from './UserCreateWithoutCollectionsInput.schema';
import { UserUncheckedCreateWithoutCollectionsInputObjectSchema as UserUncheckedCreateWithoutCollectionsInputObjectSchema } from './UserUncheckedCreateWithoutCollectionsInput.schema';
import { UserCreateOrConnectWithoutCollectionsInputObjectSchema as UserCreateOrConnectWithoutCollectionsInputObjectSchema } from './UserCreateOrConnectWithoutCollectionsInput.schema';
import { UserUpsertWithoutCollectionsInputObjectSchema as UserUpsertWithoutCollectionsInputObjectSchema } from './UserUpsertWithoutCollectionsInput.schema';
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserUpdateToOneWithWhereWithoutCollectionsInputObjectSchema as UserUpdateToOneWithWhereWithoutCollectionsInputObjectSchema } from './UserUpdateToOneWithWhereWithoutCollectionsInput.schema';
import { UserUpdateWithoutCollectionsInputObjectSchema as UserUpdateWithoutCollectionsInputObjectSchema } from './UserUpdateWithoutCollectionsInput.schema';
import { UserUncheckedUpdateWithoutCollectionsInputObjectSchema as UserUncheckedUpdateWithoutCollectionsInputObjectSchema } from './UserUncheckedUpdateWithoutCollectionsInput.schema';

const makeSchema = () =>
  z
    .object({
      create: z
        .union([
          z.lazy(() => UserCreateWithoutCollectionsInputObjectSchema),
          z.lazy(() => UserUncheckedCreateWithoutCollectionsInputObjectSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => UserCreateOrConnectWithoutCollectionsInputObjectSchema)
        .optional(),
      upsert: z
        .lazy(() => UserUpsertWithoutCollectionsInputObjectSchema)
        .optional(),
      connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional(),
      update: z
        .union([
          z.lazy(
            () => UserUpdateToOneWithWhereWithoutCollectionsInputObjectSchema,
          ),
          z.lazy(() => UserUpdateWithoutCollectionsInputObjectSchema),
          z.lazy(() => UserUncheckedUpdateWithoutCollectionsInputObjectSchema),
        ])
        .optional(),
    })
    .strict();
export const UserUpdateOneRequiredWithoutCollectionsNestedInputObjectSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutCollectionsNestedInput> =
  makeSchema() as unknown as z.ZodType<Prisma.UserUpdateOneRequiredWithoutCollectionsNestedInput>;
export const UserUpdateOneRequiredWithoutCollectionsNestedInputObjectZodSchema =
  makeSchema();
