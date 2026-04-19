import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UtensilUpdateWithoutUsersInputObjectSchema as UtensilUpdateWithoutUsersInputObjectSchema } from './UtensilUpdateWithoutUsersInput.schema';
import { UtensilUncheckedUpdateWithoutUsersInputObjectSchema as UtensilUncheckedUpdateWithoutUsersInputObjectSchema } from './UtensilUncheckedUpdateWithoutUsersInput.schema';
import { UtensilCreateWithoutUsersInputObjectSchema as UtensilCreateWithoutUsersInputObjectSchema } from './UtensilCreateWithoutUsersInput.schema';
import { UtensilUncheckedCreateWithoutUsersInputObjectSchema as UtensilUncheckedCreateWithoutUsersInputObjectSchema } from './UtensilUncheckedCreateWithoutUsersInput.schema';
import { UtensilWhereInputObjectSchema as UtensilWhereInputObjectSchema } from './UtensilWhereInput.schema';

const makeSchema = () =>
  z
    .object({
      update: z.union([
        z.lazy(() => UtensilUpdateWithoutUsersInputObjectSchema),
        z.lazy(() => UtensilUncheckedUpdateWithoutUsersInputObjectSchema),
      ]),
      create: z.union([
        z.lazy(() => UtensilCreateWithoutUsersInputObjectSchema),
        z.lazy(() => UtensilUncheckedCreateWithoutUsersInputObjectSchema),
      ]),
      where: z.lazy(() => UtensilWhereInputObjectSchema).optional(),
    })
    .strict();
export const UtensilUpsertWithoutUsersInputObjectSchema: z.ZodType<Prisma.UtensilUpsertWithoutUsersInput> =
  makeSchema() as unknown as z.ZodType<Prisma.UtensilUpsertWithoutUsersInput>;
export const UtensilUpsertWithoutUsersInputObjectZodSchema = makeSchema();
