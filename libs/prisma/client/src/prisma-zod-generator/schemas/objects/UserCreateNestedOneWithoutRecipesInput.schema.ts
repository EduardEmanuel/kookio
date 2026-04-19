import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserCreateWithoutRecipesInputObjectSchema as UserCreateWithoutRecipesInputObjectSchema } from './UserCreateWithoutRecipesInput.schema';
import { UserUncheckedCreateWithoutRecipesInputObjectSchema as UserUncheckedCreateWithoutRecipesInputObjectSchema } from './UserUncheckedCreateWithoutRecipesInput.schema';
import { UserCreateOrConnectWithoutRecipesInputObjectSchema as UserCreateOrConnectWithoutRecipesInputObjectSchema } from './UserCreateOrConnectWithoutRecipesInput.schema';
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';

const makeSchema = () =>
  z
    .object({
      create: z
        .union([
          z.lazy(() => UserCreateWithoutRecipesInputObjectSchema),
          z.lazy(() => UserUncheckedCreateWithoutRecipesInputObjectSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => UserCreateOrConnectWithoutRecipesInputObjectSchema)
        .optional(),
      connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional(),
    })
    .strict();
export const UserCreateNestedOneWithoutRecipesInputObjectSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutRecipesInput> =
  makeSchema() as unknown as z.ZodType<Prisma.UserCreateNestedOneWithoutRecipesInput>;
export const UserCreateNestedOneWithoutRecipesInputObjectZodSchema =
  makeSchema();
