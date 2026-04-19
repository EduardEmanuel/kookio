import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserUpdateWithoutMealPlansInputObjectSchema as UserUpdateWithoutMealPlansInputObjectSchema } from './UserUpdateWithoutMealPlansInput.schema';
import { UserUncheckedUpdateWithoutMealPlansInputObjectSchema as UserUncheckedUpdateWithoutMealPlansInputObjectSchema } from './UserUncheckedUpdateWithoutMealPlansInput.schema';
import { UserCreateWithoutMealPlansInputObjectSchema as UserCreateWithoutMealPlansInputObjectSchema } from './UserCreateWithoutMealPlansInput.schema';
import { UserUncheckedCreateWithoutMealPlansInputObjectSchema as UserUncheckedCreateWithoutMealPlansInputObjectSchema } from './UserUncheckedCreateWithoutMealPlansInput.schema';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema';

const makeSchema = () =>
  z
    .object({
      update: z.union([
        z.lazy(() => UserUpdateWithoutMealPlansInputObjectSchema),
        z.lazy(() => UserUncheckedUpdateWithoutMealPlansInputObjectSchema),
      ]),
      create: z.union([
        z.lazy(() => UserCreateWithoutMealPlansInputObjectSchema),
        z.lazy(() => UserUncheckedCreateWithoutMealPlansInputObjectSchema),
      ]),
      where: z.lazy(() => UserWhereInputObjectSchema).optional(),
    })
    .strict();
export const UserUpsertWithoutMealPlansInputObjectSchema: z.ZodType<Prisma.UserUpsertWithoutMealPlansInput> =
  makeSchema() as unknown as z.ZodType<Prisma.UserUpsertWithoutMealPlansInput>;
export const UserUpsertWithoutMealPlansInputObjectZodSchema = makeSchema();
