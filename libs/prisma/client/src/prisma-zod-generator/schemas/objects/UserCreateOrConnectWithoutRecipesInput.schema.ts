import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserCreateWithoutRecipesInputObjectSchema as UserCreateWithoutRecipesInputObjectSchema } from './UserCreateWithoutRecipesInput.schema';
import { UserUncheckedCreateWithoutRecipesInputObjectSchema as UserUncheckedCreateWithoutRecipesInputObjectSchema } from './UserUncheckedCreateWithoutRecipesInput.schema';

const makeSchema = () =>
  z
    .object({
      where: z.lazy(() => UserWhereUniqueInputObjectSchema),
      create: z.union([
        z.lazy(() => UserCreateWithoutRecipesInputObjectSchema),
        z.lazy(() => UserUncheckedCreateWithoutRecipesInputObjectSchema),
      ]),
    })
    .strict();
export const UserCreateOrConnectWithoutRecipesInputObjectSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutRecipesInput> =
  makeSchema() as unknown as z.ZodType<Prisma.UserCreateOrConnectWithoutRecipesInput>;
export const UserCreateOrConnectWithoutRecipesInputObjectZodSchema =
  makeSchema();
