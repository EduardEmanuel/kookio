import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserUtensilWhereUniqueInputObjectSchema as UserUtensilWhereUniqueInputObjectSchema } from './UserUtensilWhereUniqueInput.schema';
import { UserUtensilUpdateWithoutUtensilInputObjectSchema as UserUtensilUpdateWithoutUtensilInputObjectSchema } from './UserUtensilUpdateWithoutUtensilInput.schema';
import { UserUtensilUncheckedUpdateWithoutUtensilInputObjectSchema as UserUtensilUncheckedUpdateWithoutUtensilInputObjectSchema } from './UserUtensilUncheckedUpdateWithoutUtensilInput.schema';

const makeSchema = () =>
  z
    .object({
      where: z.lazy(() => UserUtensilWhereUniqueInputObjectSchema),
      data: z.union([
        z.lazy(() => UserUtensilUpdateWithoutUtensilInputObjectSchema),
        z.lazy(() => UserUtensilUncheckedUpdateWithoutUtensilInputObjectSchema),
      ]),
    })
    .strict();
export const UserUtensilUpdateWithWhereUniqueWithoutUtensilInputObjectSchema: z.ZodType<Prisma.UserUtensilUpdateWithWhereUniqueWithoutUtensilInput> =
  makeSchema() as unknown as z.ZodType<Prisma.UserUtensilUpdateWithWhereUniqueWithoutUtensilInput>;
export const UserUtensilUpdateWithWhereUniqueWithoutUtensilInputObjectZodSchema =
  makeSchema();
