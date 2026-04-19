import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserCreateWithoutPantryItemsInputObjectSchema as UserCreateWithoutPantryItemsInputObjectSchema } from './UserCreateWithoutPantryItemsInput.schema';
import { UserUncheckedCreateWithoutPantryItemsInputObjectSchema as UserUncheckedCreateWithoutPantryItemsInputObjectSchema } from './UserUncheckedCreateWithoutPantryItemsInput.schema';
import { UserCreateOrConnectWithoutPantryItemsInputObjectSchema as UserCreateOrConnectWithoutPantryItemsInputObjectSchema } from './UserCreateOrConnectWithoutPantryItemsInput.schema';
import { UserUpsertWithoutPantryItemsInputObjectSchema as UserUpsertWithoutPantryItemsInputObjectSchema } from './UserUpsertWithoutPantryItemsInput.schema';
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserUpdateToOneWithWhereWithoutPantryItemsInputObjectSchema as UserUpdateToOneWithWhereWithoutPantryItemsInputObjectSchema } from './UserUpdateToOneWithWhereWithoutPantryItemsInput.schema';
import { UserUpdateWithoutPantryItemsInputObjectSchema as UserUpdateWithoutPantryItemsInputObjectSchema } from './UserUpdateWithoutPantryItemsInput.schema';
import { UserUncheckedUpdateWithoutPantryItemsInputObjectSchema as UserUncheckedUpdateWithoutPantryItemsInputObjectSchema } from './UserUncheckedUpdateWithoutPantryItemsInput.schema';

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
      upsert: z
        .lazy(() => UserUpsertWithoutPantryItemsInputObjectSchema)
        .optional(),
      connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional(),
      update: z
        .union([
          z.lazy(
            () => UserUpdateToOneWithWhereWithoutPantryItemsInputObjectSchema,
          ),
          z.lazy(() => UserUpdateWithoutPantryItemsInputObjectSchema),
          z.lazy(() => UserUncheckedUpdateWithoutPantryItemsInputObjectSchema),
        ])
        .optional(),
    })
    .strict();
export const UserUpdateOneRequiredWithoutPantryItemsNestedInputObjectSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutPantryItemsNestedInput> =
  makeSchema() as unknown as z.ZodType<Prisma.UserUpdateOneRequiredWithoutPantryItemsNestedInput>;
export const UserUpdateOneRequiredWithoutPantryItemsNestedInputObjectZodSchema =
  makeSchema();
