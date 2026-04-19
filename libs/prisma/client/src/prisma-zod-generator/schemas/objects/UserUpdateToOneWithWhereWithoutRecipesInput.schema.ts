import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema';
import { UserUpdateWithoutRecipesInputObjectSchema as UserUpdateWithoutRecipesInputObjectSchema } from './UserUpdateWithoutRecipesInput.schema';
import { UserUncheckedUpdateWithoutRecipesInputObjectSchema as UserUncheckedUpdateWithoutRecipesInputObjectSchema } from './UserUncheckedUpdateWithoutRecipesInput.schema';

const makeSchema = () =>
  z
    .object({
      where: z.lazy(() => UserWhereInputObjectSchema).optional(),
      data: z.union([
        z.lazy(() => UserUpdateWithoutRecipesInputObjectSchema),
        z.lazy(() => UserUncheckedUpdateWithoutRecipesInputObjectSchema),
      ]),
    })
    .strict();
export const UserUpdateToOneWithWhereWithoutRecipesInputObjectSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutRecipesInput> =
  makeSchema() as unknown as z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutRecipesInput>;
export const UserUpdateToOneWithWhereWithoutRecipesInputObjectZodSchema =
  makeSchema();
