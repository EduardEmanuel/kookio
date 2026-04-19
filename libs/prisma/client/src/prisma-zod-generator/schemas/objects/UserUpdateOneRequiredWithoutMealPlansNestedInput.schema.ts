import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserCreateWithoutMealPlansInputObjectSchema as UserCreateWithoutMealPlansInputObjectSchema } from './UserCreateWithoutMealPlansInput.schema';
import { UserUncheckedCreateWithoutMealPlansInputObjectSchema as UserUncheckedCreateWithoutMealPlansInputObjectSchema } from './UserUncheckedCreateWithoutMealPlansInput.schema';
import { UserCreateOrConnectWithoutMealPlansInputObjectSchema as UserCreateOrConnectWithoutMealPlansInputObjectSchema } from './UserCreateOrConnectWithoutMealPlansInput.schema';
import { UserUpsertWithoutMealPlansInputObjectSchema as UserUpsertWithoutMealPlansInputObjectSchema } from './UserUpsertWithoutMealPlansInput.schema';
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserUpdateToOneWithWhereWithoutMealPlansInputObjectSchema as UserUpdateToOneWithWhereWithoutMealPlansInputObjectSchema } from './UserUpdateToOneWithWhereWithoutMealPlansInput.schema';
import { UserUpdateWithoutMealPlansInputObjectSchema as UserUpdateWithoutMealPlansInputObjectSchema } from './UserUpdateWithoutMealPlansInput.schema';
import { UserUncheckedUpdateWithoutMealPlansInputObjectSchema as UserUncheckedUpdateWithoutMealPlansInputObjectSchema } from './UserUncheckedUpdateWithoutMealPlansInput.schema';

const makeSchema = () =>
  z
    .object({
      create: z
        .union([
          z.lazy(() => UserCreateWithoutMealPlansInputObjectSchema),
          z.lazy(() => UserUncheckedCreateWithoutMealPlansInputObjectSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => UserCreateOrConnectWithoutMealPlansInputObjectSchema)
        .optional(),
      upsert: z
        .lazy(() => UserUpsertWithoutMealPlansInputObjectSchema)
        .optional(),
      connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional(),
      update: z
        .union([
          z.lazy(
            () => UserUpdateToOneWithWhereWithoutMealPlansInputObjectSchema,
          ),
          z.lazy(() => UserUpdateWithoutMealPlansInputObjectSchema),
          z.lazy(() => UserUncheckedUpdateWithoutMealPlansInputObjectSchema),
        ])
        .optional(),
    })
    .strict();
export const UserUpdateOneRequiredWithoutMealPlansNestedInputObjectSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutMealPlansNestedInput> =
  makeSchema() as unknown as z.ZodType<Prisma.UserUpdateOneRequiredWithoutMealPlansNestedInput>;
export const UserUpdateOneRequiredWithoutMealPlansNestedInputObjectZodSchema =
  makeSchema();
