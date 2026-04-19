import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserCreateWithoutPantryItemsInputObjectSchema as UserCreateWithoutPantryItemsInputObjectSchema } from './UserCreateWithoutPantryItemsInput.schema';
import { UserUncheckedCreateWithoutPantryItemsInputObjectSchema as UserUncheckedCreateWithoutPantryItemsInputObjectSchema } from './UserUncheckedCreateWithoutPantryItemsInput.schema';

const makeSchema = () =>
  z
    .object({
      where: z.lazy(() => UserWhereUniqueInputObjectSchema),
      create: z.union([
        z.lazy(() => UserCreateWithoutPantryItemsInputObjectSchema),
        z.lazy(() => UserUncheckedCreateWithoutPantryItemsInputObjectSchema),
      ]),
    })
    .strict();
export const UserCreateOrConnectWithoutPantryItemsInputObjectSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutPantryItemsInput> =
  makeSchema() as unknown as z.ZodType<Prisma.UserCreateOrConnectWithoutPantryItemsInput>;
export const UserCreateOrConnectWithoutPantryItemsInputObjectZodSchema =
  makeSchema();
