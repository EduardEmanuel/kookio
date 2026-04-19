import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema';
import { UserUpdateWithoutMealPlansInputObjectSchema as UserUpdateWithoutMealPlansInputObjectSchema } from './UserUpdateWithoutMealPlansInput.schema';
import { UserUncheckedUpdateWithoutMealPlansInputObjectSchema as UserUncheckedUpdateWithoutMealPlansInputObjectSchema } from './UserUncheckedUpdateWithoutMealPlansInput.schema';

const makeSchema = () =>
  z
    .object({
      where: z.lazy(() => UserWhereInputObjectSchema).optional(),
      data: z.union([
        z.lazy(() => UserUpdateWithoutMealPlansInputObjectSchema),
        z.lazy(() => UserUncheckedUpdateWithoutMealPlansInputObjectSchema),
      ]),
    })
    .strict();
export const UserUpdateToOneWithWhereWithoutMealPlansInputObjectSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutMealPlansInput> =
  makeSchema() as unknown as z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutMealPlansInput>;
export const UserUpdateToOneWithWhereWithoutMealPlansInputObjectZodSchema =
  makeSchema();
