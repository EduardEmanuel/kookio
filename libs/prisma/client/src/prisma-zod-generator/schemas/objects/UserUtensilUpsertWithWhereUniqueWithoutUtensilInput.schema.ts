import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserUtensilWhereUniqueInputObjectSchema as UserUtensilWhereUniqueInputObjectSchema } from './UserUtensilWhereUniqueInput.schema';
import { UserUtensilUpdateWithoutUtensilInputObjectSchema as UserUtensilUpdateWithoutUtensilInputObjectSchema } from './UserUtensilUpdateWithoutUtensilInput.schema';
import { UserUtensilUncheckedUpdateWithoutUtensilInputObjectSchema as UserUtensilUncheckedUpdateWithoutUtensilInputObjectSchema } from './UserUtensilUncheckedUpdateWithoutUtensilInput.schema';
import { UserUtensilCreateWithoutUtensilInputObjectSchema as UserUtensilCreateWithoutUtensilInputObjectSchema } from './UserUtensilCreateWithoutUtensilInput.schema';
import { UserUtensilUncheckedCreateWithoutUtensilInputObjectSchema as UserUtensilUncheckedCreateWithoutUtensilInputObjectSchema } from './UserUtensilUncheckedCreateWithoutUtensilInput.schema';

const makeSchema = () =>
  z
    .object({
      where: z.lazy(() => UserUtensilWhereUniqueInputObjectSchema),
      update: z.union([
        z.lazy(() => UserUtensilUpdateWithoutUtensilInputObjectSchema),
        z.lazy(() => UserUtensilUncheckedUpdateWithoutUtensilInputObjectSchema),
      ]),
      create: z.union([
        z.lazy(() => UserUtensilCreateWithoutUtensilInputObjectSchema),
        z.lazy(() => UserUtensilUncheckedCreateWithoutUtensilInputObjectSchema),
      ]),
    })
    .strict();
export const UserUtensilUpsertWithWhereUniqueWithoutUtensilInputObjectSchema: z.ZodType<Prisma.UserUtensilUpsertWithWhereUniqueWithoutUtensilInput> =
  makeSchema() as unknown as z.ZodType<Prisma.UserUtensilUpsertWithWhereUniqueWithoutUtensilInput>;
export const UserUtensilUpsertWithWhereUniqueWithoutUtensilInputObjectZodSchema =
  makeSchema();
