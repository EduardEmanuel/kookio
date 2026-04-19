import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserCreateWithoutPantryItemsInputObjectSchema as UserCreateWithoutPantryItemsInputObjectSchema } from './UserCreateWithoutPantryItemsInput.schema';
import { UserUncheckedCreateWithoutPantryItemsInputObjectSchema as UserUncheckedCreateWithoutPantryItemsInputObjectSchema } from './UserUncheckedCreateWithoutPantryItemsInput.schema';
import { UserCreateOrConnectWithoutPantryItemsInputObjectSchema as UserCreateOrConnectWithoutPantryItemsInputObjectSchema } from './UserCreateOrConnectWithoutPantryItemsInput.schema';
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';

const makeSchema = () =>
  z
    .object({
      create: z
        .union([
          z.lazy(() => UserCreateWithoutPantryItemsInputObjectSchema),
          z.lazy(() => UserUncheckedCreateWithoutPantryItemsInputObjectSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => UserCreateOrConnectWithoutPantryItemsInputObjectSchema)
        .optional(),
      connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional(),
    })
    .strict();
export const UserCreateNestedOneWithoutPantryItemsInputObjectSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutPantryItemsInput> =
  makeSchema() as unknown as z.ZodType<Prisma.UserCreateNestedOneWithoutPantryItemsInput>;
export const UserCreateNestedOneWithoutPantryItemsInputObjectZodSchema =
  makeSchema();
