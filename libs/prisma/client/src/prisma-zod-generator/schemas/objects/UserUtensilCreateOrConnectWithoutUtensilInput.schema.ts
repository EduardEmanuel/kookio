import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserUtensilWhereUniqueInputObjectSchema as UserUtensilWhereUniqueInputObjectSchema } from './UserUtensilWhereUniqueInput.schema';
import { UserUtensilCreateWithoutUtensilInputObjectSchema as UserUtensilCreateWithoutUtensilInputObjectSchema } from './UserUtensilCreateWithoutUtensilInput.schema';
import { UserUtensilUncheckedCreateWithoutUtensilInputObjectSchema as UserUtensilUncheckedCreateWithoutUtensilInputObjectSchema } from './UserUtensilUncheckedCreateWithoutUtensilInput.schema';

const makeSchema = () =>
  z
    .object({
      where: z.lazy(() => UserUtensilWhereUniqueInputObjectSchema),
      create: z.union([
        z.lazy(() => UserUtensilCreateWithoutUtensilInputObjectSchema),
        z.lazy(() => UserUtensilUncheckedCreateWithoutUtensilInputObjectSchema),
      ]),
    })
    .strict();
export const UserUtensilCreateOrConnectWithoutUtensilInputObjectSchema: z.ZodType<Prisma.UserUtensilCreateOrConnectWithoutUtensilInput> =
  makeSchema() as unknown as z.ZodType<Prisma.UserUtensilCreateOrConnectWithoutUtensilInput>;
export const UserUtensilCreateOrConnectWithoutUtensilInputObjectZodSchema =
  makeSchema();
