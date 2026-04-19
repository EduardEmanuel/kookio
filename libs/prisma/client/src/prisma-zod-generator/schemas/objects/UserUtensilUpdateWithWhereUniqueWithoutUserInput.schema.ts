import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserUtensilWhereUniqueInputObjectSchema as UserUtensilWhereUniqueInputObjectSchema } from './UserUtensilWhereUniqueInput.schema';
import { UserUtensilUpdateWithoutUserInputObjectSchema as UserUtensilUpdateWithoutUserInputObjectSchema } from './UserUtensilUpdateWithoutUserInput.schema';
import { UserUtensilUncheckedUpdateWithoutUserInputObjectSchema as UserUtensilUncheckedUpdateWithoutUserInputObjectSchema } from './UserUtensilUncheckedUpdateWithoutUserInput.schema';

const makeSchema = () =>
  z
    .object({
      where: z.lazy(() => UserUtensilWhereUniqueInputObjectSchema),
      data: z.union([
        z.lazy(() => UserUtensilUpdateWithoutUserInputObjectSchema),
        z.lazy(() => UserUtensilUncheckedUpdateWithoutUserInputObjectSchema),
      ]),
    })
    .strict();
export const UserUtensilUpdateWithWhereUniqueWithoutUserInputObjectSchema: z.ZodType<Prisma.UserUtensilUpdateWithWhereUniqueWithoutUserInput> =
  makeSchema() as unknown as z.ZodType<Prisma.UserUtensilUpdateWithWhereUniqueWithoutUserInput>;
export const UserUtensilUpdateWithWhereUniqueWithoutUserInputObjectZodSchema =
  makeSchema();
