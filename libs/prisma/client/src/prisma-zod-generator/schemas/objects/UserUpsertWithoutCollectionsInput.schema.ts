import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserUpdateWithoutCollectionsInputObjectSchema as UserUpdateWithoutCollectionsInputObjectSchema } from './UserUpdateWithoutCollectionsInput.schema';
import { UserUncheckedUpdateWithoutCollectionsInputObjectSchema as UserUncheckedUpdateWithoutCollectionsInputObjectSchema } from './UserUncheckedUpdateWithoutCollectionsInput.schema';
import { UserCreateWithoutCollectionsInputObjectSchema as UserCreateWithoutCollectionsInputObjectSchema } from './UserCreateWithoutCollectionsInput.schema';
import { UserUncheckedCreateWithoutCollectionsInputObjectSchema as UserUncheckedCreateWithoutCollectionsInputObjectSchema } from './UserUncheckedCreateWithoutCollectionsInput.schema';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema';

const makeSchema = () =>
  z
    .object({
      update: z.union([
        z.lazy(() => UserUpdateWithoutCollectionsInputObjectSchema),
        z.lazy(() => UserUncheckedUpdateWithoutCollectionsInputObjectSchema),
      ]),
      create: z.union([
        z.lazy(() => UserCreateWithoutCollectionsInputObjectSchema),
        z.lazy(() => UserUncheckedCreateWithoutCollectionsInputObjectSchema),
      ]),
      where: z.lazy(() => UserWhereInputObjectSchema).optional(),
    })
    .strict();
export const UserUpsertWithoutCollectionsInputObjectSchema: z.ZodType<Prisma.UserUpsertWithoutCollectionsInput> =
  makeSchema() as unknown as z.ZodType<Prisma.UserUpsertWithoutCollectionsInput>;
export const UserUpsertWithoutCollectionsInputObjectZodSchema = makeSchema();
