import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserUtensilWhereUniqueInputObjectSchema as UserUtensilWhereUniqueInputObjectSchema } from './UserUtensilWhereUniqueInput.schema';
import { UserUtensilCreateWithoutUserInputObjectSchema as UserUtensilCreateWithoutUserInputObjectSchema } from './UserUtensilCreateWithoutUserInput.schema';
import { UserUtensilUncheckedCreateWithoutUserInputObjectSchema as UserUtensilUncheckedCreateWithoutUserInputObjectSchema } from './UserUtensilUncheckedCreateWithoutUserInput.schema';

const makeSchema = () =>
  z
    .object({
      where: z.lazy(() => UserUtensilWhereUniqueInputObjectSchema),
      create: z.union([
        z.lazy(() => UserUtensilCreateWithoutUserInputObjectSchema),
        z.lazy(() => UserUtensilUncheckedCreateWithoutUserInputObjectSchema),
      ]),
    })
    .strict();
export const UserUtensilCreateOrConnectWithoutUserInputObjectSchema: z.ZodType<Prisma.UserUtensilCreateOrConnectWithoutUserInput> =
  makeSchema() as unknown as z.ZodType<Prisma.UserUtensilCreateOrConnectWithoutUserInput>;
export const UserUtensilCreateOrConnectWithoutUserInputObjectZodSchema =
  makeSchema();
