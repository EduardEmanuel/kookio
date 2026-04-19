import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserCreateWithoutCollectionsInputObjectSchema as UserCreateWithoutCollectionsInputObjectSchema } from './UserCreateWithoutCollectionsInput.schema';
import { UserUncheckedCreateWithoutCollectionsInputObjectSchema as UserUncheckedCreateWithoutCollectionsInputObjectSchema } from './UserUncheckedCreateWithoutCollectionsInput.schema';
import { UserCreateOrConnectWithoutCollectionsInputObjectSchema as UserCreateOrConnectWithoutCollectionsInputObjectSchema } from './UserCreateOrConnectWithoutCollectionsInput.schema';
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';

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
      connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional(),
    })
    .strict();
export const UserCreateNestedOneWithoutCollectionsInputObjectSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutCollectionsInput> =
  makeSchema() as unknown as z.ZodType<Prisma.UserCreateNestedOneWithoutCollectionsInput>;
export const UserCreateNestedOneWithoutCollectionsInputObjectZodSchema =
  makeSchema();
