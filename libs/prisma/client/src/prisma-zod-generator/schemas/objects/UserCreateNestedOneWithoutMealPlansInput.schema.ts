import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserCreateWithoutMealPlansInputObjectSchema as UserCreateWithoutMealPlansInputObjectSchema } from './UserCreateWithoutMealPlansInput.schema';
import { UserUncheckedCreateWithoutMealPlansInputObjectSchema as UserUncheckedCreateWithoutMealPlansInputObjectSchema } from './UserUncheckedCreateWithoutMealPlansInput.schema';
import { UserCreateOrConnectWithoutMealPlansInputObjectSchema as UserCreateOrConnectWithoutMealPlansInputObjectSchema } from './UserCreateOrConnectWithoutMealPlansInput.schema';
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';

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
      connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional(),
    })
    .strict();
export const UserCreateNestedOneWithoutMealPlansInputObjectSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutMealPlansInput> =
  makeSchema() as unknown as z.ZodType<Prisma.UserCreateNestedOneWithoutMealPlansInput>;
export const UserCreateNestedOneWithoutMealPlansInputObjectZodSchema =
  makeSchema();
