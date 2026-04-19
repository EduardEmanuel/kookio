import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserCreateWithoutCollectionsInputObjectSchema as UserCreateWithoutCollectionsInputObjectSchema } from './UserCreateWithoutCollectionsInput.schema';
import { UserUncheckedCreateWithoutCollectionsInputObjectSchema as UserUncheckedCreateWithoutCollectionsInputObjectSchema } from './UserUncheckedCreateWithoutCollectionsInput.schema';

const makeSchema = () =>
  z
    .object({
      where: z.lazy(() => UserWhereUniqueInputObjectSchema),
      create: z.union([
        z.lazy(() => UserCreateWithoutCollectionsInputObjectSchema),
        z.lazy(() => UserUncheckedCreateWithoutCollectionsInputObjectSchema),
      ]),
    })
    .strict();
export const UserCreateOrConnectWithoutCollectionsInputObjectSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutCollectionsInput> =
  makeSchema() as unknown as z.ZodType<Prisma.UserCreateOrConnectWithoutCollectionsInput>;
export const UserCreateOrConnectWithoutCollectionsInputObjectZodSchema =
  makeSchema();
