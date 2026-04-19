import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserUpdateWithoutPantryItemsInputObjectSchema as UserUpdateWithoutPantryItemsInputObjectSchema } from './UserUpdateWithoutPantryItemsInput.schema';
import { UserUncheckedUpdateWithoutPantryItemsInputObjectSchema as UserUncheckedUpdateWithoutPantryItemsInputObjectSchema } from './UserUncheckedUpdateWithoutPantryItemsInput.schema';
import { UserCreateWithoutPantryItemsInputObjectSchema as UserCreateWithoutPantryItemsInputObjectSchema } from './UserCreateWithoutPantryItemsInput.schema';
import { UserUncheckedCreateWithoutPantryItemsInputObjectSchema as UserUncheckedCreateWithoutPantryItemsInputObjectSchema } from './UserUncheckedCreateWithoutPantryItemsInput.schema';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema';

const makeSchema = () =>
  z
    .object({
      update: z.union([
        z.lazy(() => UserUpdateWithoutPantryItemsInputObjectSchema),
        z.lazy(() => UserUncheckedUpdateWithoutPantryItemsInputObjectSchema),
      ]),
      create: z.union([
        z.lazy(() => UserCreateWithoutPantryItemsInputObjectSchema),
        z.lazy(() => UserUncheckedCreateWithoutPantryItemsInputObjectSchema),
      ]),
      where: z.lazy(() => UserWhereInputObjectSchema).optional(),
    })
    .strict();
export const UserUpsertWithoutPantryItemsInputObjectSchema: z.ZodType<Prisma.UserUpsertWithoutPantryItemsInput> =
  makeSchema() as unknown as z.ZodType<Prisma.UserUpsertWithoutPantryItemsInput>;
export const UserUpsertWithoutPantryItemsInputObjectZodSchema = makeSchema();
