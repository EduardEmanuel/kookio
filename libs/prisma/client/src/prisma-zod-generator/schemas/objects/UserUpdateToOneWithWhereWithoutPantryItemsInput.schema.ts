import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema';
import { UserUpdateWithoutPantryItemsInputObjectSchema as UserUpdateWithoutPantryItemsInputObjectSchema } from './UserUpdateWithoutPantryItemsInput.schema';
import { UserUncheckedUpdateWithoutPantryItemsInputObjectSchema as UserUncheckedUpdateWithoutPantryItemsInputObjectSchema } from './UserUncheckedUpdateWithoutPantryItemsInput.schema';

const makeSchema = () =>
  z
    .object({
      where: z.lazy(() => UserWhereInputObjectSchema).optional(),
      data: z.union([
        z.lazy(() => UserUpdateWithoutPantryItemsInputObjectSchema),
        z.lazy(() => UserUncheckedUpdateWithoutPantryItemsInputObjectSchema),
      ]),
    })
    .strict();
export const UserUpdateToOneWithWhereWithoutPantryItemsInputObjectSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutPantryItemsInput> =
  makeSchema() as unknown as z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutPantryItemsInput>;
export const UserUpdateToOneWithWhereWithoutPantryItemsInputObjectZodSchema =
  makeSchema();
