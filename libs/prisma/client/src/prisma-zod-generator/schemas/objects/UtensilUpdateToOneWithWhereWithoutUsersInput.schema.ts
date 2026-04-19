import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UtensilWhereInputObjectSchema as UtensilWhereInputObjectSchema } from './UtensilWhereInput.schema';
import { UtensilUpdateWithoutUsersInputObjectSchema as UtensilUpdateWithoutUsersInputObjectSchema } from './UtensilUpdateWithoutUsersInput.schema';
import { UtensilUncheckedUpdateWithoutUsersInputObjectSchema as UtensilUncheckedUpdateWithoutUsersInputObjectSchema } from './UtensilUncheckedUpdateWithoutUsersInput.schema';

const makeSchema = () =>
  z
    .object({
      where: z.lazy(() => UtensilWhereInputObjectSchema).optional(),
      data: z.union([
        z.lazy(() => UtensilUpdateWithoutUsersInputObjectSchema),
        z.lazy(() => UtensilUncheckedUpdateWithoutUsersInputObjectSchema),
      ]),
    })
    .strict();
export const UtensilUpdateToOneWithWhereWithoutUsersInputObjectSchema: z.ZodType<Prisma.UtensilUpdateToOneWithWhereWithoutUsersInput> =
  makeSchema() as unknown as z.ZodType<Prisma.UtensilUpdateToOneWithWhereWithoutUsersInput>;
export const UtensilUpdateToOneWithWhereWithoutUsersInputObjectZodSchema =
  makeSchema();
