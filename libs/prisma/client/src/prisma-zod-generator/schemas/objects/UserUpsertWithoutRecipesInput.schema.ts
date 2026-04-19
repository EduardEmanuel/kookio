import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserUpdateWithoutRecipesInputObjectSchema as UserUpdateWithoutRecipesInputObjectSchema } from './UserUpdateWithoutRecipesInput.schema';
import { UserUncheckedUpdateWithoutRecipesInputObjectSchema as UserUncheckedUpdateWithoutRecipesInputObjectSchema } from './UserUncheckedUpdateWithoutRecipesInput.schema';
import { UserCreateWithoutRecipesInputObjectSchema as UserCreateWithoutRecipesInputObjectSchema } from './UserCreateWithoutRecipesInput.schema';
import { UserUncheckedCreateWithoutRecipesInputObjectSchema as UserUncheckedCreateWithoutRecipesInputObjectSchema } from './UserUncheckedCreateWithoutRecipesInput.schema';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema';

const makeSchema = () =>
  z
    .object({
      update: z.union([
        z.lazy(() => UserUpdateWithoutRecipesInputObjectSchema),
        z.lazy(() => UserUncheckedUpdateWithoutRecipesInputObjectSchema),
      ]),
      create: z.union([
        z.lazy(() => UserCreateWithoutRecipesInputObjectSchema),
        z.lazy(() => UserUncheckedCreateWithoutRecipesInputObjectSchema),
      ]),
      where: z.lazy(() => UserWhereInputObjectSchema).optional(),
    })
    .strict();
export const UserUpsertWithoutRecipesInputObjectSchema: z.ZodType<Prisma.UserUpsertWithoutRecipesInput> =
  makeSchema() as unknown as z.ZodType<Prisma.UserUpsertWithoutRecipesInput>;
export const UserUpsertWithoutRecipesInputObjectZodSchema = makeSchema();
