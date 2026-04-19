import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UtensilWhereUniqueInputObjectSchema as UtensilWhereUniqueInputObjectSchema } from './UtensilWhereUniqueInput.schema';
import { UtensilCreateWithoutUsersInputObjectSchema as UtensilCreateWithoutUsersInputObjectSchema } from './UtensilCreateWithoutUsersInput.schema';
import { UtensilUncheckedCreateWithoutUsersInputObjectSchema as UtensilUncheckedCreateWithoutUsersInputObjectSchema } from './UtensilUncheckedCreateWithoutUsersInput.schema';

const makeSchema = () =>
  z
    .object({
      where: z.lazy(() => UtensilWhereUniqueInputObjectSchema),
      create: z.union([
        z.lazy(() => UtensilCreateWithoutUsersInputObjectSchema),
        z.lazy(() => UtensilUncheckedCreateWithoutUsersInputObjectSchema),
      ]),
    })
    .strict();
export const UtensilCreateOrConnectWithoutUsersInputObjectSchema: z.ZodType<Prisma.UtensilCreateOrConnectWithoutUsersInput> =
  makeSchema() as unknown as z.ZodType<Prisma.UtensilCreateOrConnectWithoutUsersInput>;
export const UtensilCreateOrConnectWithoutUsersInputObjectZodSchema =
  makeSchema();
