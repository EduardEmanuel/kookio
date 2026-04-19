import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserCreateWithoutRecipesInputObjectSchema as UserCreateWithoutRecipesInputObjectSchema } from './UserCreateWithoutRecipesInput.schema';
import { UserUncheckedCreateWithoutRecipesInputObjectSchema as UserUncheckedCreateWithoutRecipesInputObjectSchema } from './UserUncheckedCreateWithoutRecipesInput.schema';
import { UserCreateOrConnectWithoutRecipesInputObjectSchema as UserCreateOrConnectWithoutRecipesInputObjectSchema } from './UserCreateOrConnectWithoutRecipesInput.schema';
import { UserUpsertWithoutRecipesInputObjectSchema as UserUpsertWithoutRecipesInputObjectSchema } from './UserUpsertWithoutRecipesInput.schema';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema';
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserUpdateToOneWithWhereWithoutRecipesInputObjectSchema as UserUpdateToOneWithWhereWithoutRecipesInputObjectSchema } from './UserUpdateToOneWithWhereWithoutRecipesInput.schema';
import { UserUpdateWithoutRecipesInputObjectSchema as UserUpdateWithoutRecipesInputObjectSchema } from './UserUpdateWithoutRecipesInput.schema';
import { UserUncheckedUpdateWithoutRecipesInputObjectSchema as UserUncheckedUpdateWithoutRecipesInputObjectSchema } from './UserUncheckedUpdateWithoutRecipesInput.schema';

const makeSchema = () =>
  z
    .object({
      create: z
        .union([
          z.lazy(() => UserCreateWithoutRecipesInputObjectSchema),
          z.lazy(() => UserUncheckedCreateWithoutRecipesInputObjectSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => UserCreateOrConnectWithoutRecipesInputObjectSchema)
        .optional(),
      upsert: z
        .lazy(() => UserUpsertWithoutRecipesInputObjectSchema)
        .optional(),
      disconnect: z
        .union([z.boolean(), z.lazy(() => UserWhereInputObjectSchema)])
        .optional(),
      delete: z
        .union([z.boolean(), z.lazy(() => UserWhereInputObjectSchema)])
        .optional(),
      connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional(),
      update: z
        .union([
          z.lazy(() => UserUpdateToOneWithWhereWithoutRecipesInputObjectSchema),
          z.lazy(() => UserUpdateWithoutRecipesInputObjectSchema),
          z.lazy(() => UserUncheckedUpdateWithoutRecipesInputObjectSchema),
        ])
        .optional(),
    })
    .strict();
export const UserUpdateOneWithoutRecipesNestedInputObjectSchema: z.ZodType<Prisma.UserUpdateOneWithoutRecipesNestedInput> =
  makeSchema() as unknown as z.ZodType<Prisma.UserUpdateOneWithoutRecipesNestedInput>;
export const UserUpdateOneWithoutRecipesNestedInputObjectZodSchema =
  makeSchema();
