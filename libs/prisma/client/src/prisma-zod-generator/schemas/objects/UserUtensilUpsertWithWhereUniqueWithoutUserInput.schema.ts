import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserUtensilWhereUniqueInputObjectSchema as UserUtensilWhereUniqueInputObjectSchema } from './UserUtensilWhereUniqueInput.schema';
import { UserUtensilUpdateWithoutUserInputObjectSchema as UserUtensilUpdateWithoutUserInputObjectSchema } from './UserUtensilUpdateWithoutUserInput.schema';
import { UserUtensilUncheckedUpdateWithoutUserInputObjectSchema as UserUtensilUncheckedUpdateWithoutUserInputObjectSchema } from './UserUtensilUncheckedUpdateWithoutUserInput.schema';
import { UserUtensilCreateWithoutUserInputObjectSchema as UserUtensilCreateWithoutUserInputObjectSchema } from './UserUtensilCreateWithoutUserInput.schema';
import { UserUtensilUncheckedCreateWithoutUserInputObjectSchema as UserUtensilUncheckedCreateWithoutUserInputObjectSchema } from './UserUtensilUncheckedCreateWithoutUserInput.schema';

const makeSchema = () =>
  z
    .object({
      where: z.lazy(() => UserUtensilWhereUniqueInputObjectSchema),
      update: z.union([
        z.lazy(() => UserUtensilUpdateWithoutUserInputObjectSchema),
        z.lazy(() => UserUtensilUncheckedUpdateWithoutUserInputObjectSchema),
      ]),
      create: z.union([
        z.lazy(() => UserUtensilCreateWithoutUserInputObjectSchema),
        z.lazy(() => UserUtensilUncheckedCreateWithoutUserInputObjectSchema),
      ]),
    })
    .strict();
export const UserUtensilUpsertWithWhereUniqueWithoutUserInputObjectSchema: z.ZodType<Prisma.UserUtensilUpsertWithWhereUniqueWithoutUserInput> =
  makeSchema() as unknown as z.ZodType<Prisma.UserUtensilUpsertWithWhereUniqueWithoutUserInput>;
export const UserUtensilUpsertWithWhereUniqueWithoutUserInputObjectZodSchema =
  makeSchema();
