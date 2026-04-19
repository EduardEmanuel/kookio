import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema';
import { UserUpdateWithoutCollectionsInputObjectSchema as UserUpdateWithoutCollectionsInputObjectSchema } from './UserUpdateWithoutCollectionsInput.schema';
import { UserUncheckedUpdateWithoutCollectionsInputObjectSchema as UserUncheckedUpdateWithoutCollectionsInputObjectSchema } from './UserUncheckedUpdateWithoutCollectionsInput.schema';

const makeSchema = () =>
  z
    .object({
      where: z.lazy(() => UserWhereInputObjectSchema).optional(),
      data: z.union([
        z.lazy(() => UserUpdateWithoutCollectionsInputObjectSchema),
        z.lazy(() => UserUncheckedUpdateWithoutCollectionsInputObjectSchema),
      ]),
    })
    .strict();
export const UserUpdateToOneWithWhereWithoutCollectionsInputObjectSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutCollectionsInput> =
  makeSchema() as unknown as z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutCollectionsInput>;
export const UserUpdateToOneWithWhereWithoutCollectionsInputObjectZodSchema =
  makeSchema();
