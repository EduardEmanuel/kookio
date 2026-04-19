import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserCreateWithoutMealPlansInputObjectSchema as UserCreateWithoutMealPlansInputObjectSchema } from './UserCreateWithoutMealPlansInput.schema';
import { UserUncheckedCreateWithoutMealPlansInputObjectSchema as UserUncheckedCreateWithoutMealPlansInputObjectSchema } from './UserUncheckedCreateWithoutMealPlansInput.schema';

const makeSchema = () =>
  z
    .object({
      where: z.lazy(() => UserWhereUniqueInputObjectSchema),
      create: z.union([
        z.lazy(() => UserCreateWithoutMealPlansInputObjectSchema),
        z.lazy(() => UserUncheckedCreateWithoutMealPlansInputObjectSchema),
      ]),
    })
    .strict();
export const UserCreateOrConnectWithoutMealPlansInputObjectSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutMealPlansInput> =
  makeSchema() as unknown as z.ZodType<Prisma.UserCreateOrConnectWithoutMealPlansInput>;
export const UserCreateOrConnectWithoutMealPlansInputObjectZodSchema =
  makeSchema();
