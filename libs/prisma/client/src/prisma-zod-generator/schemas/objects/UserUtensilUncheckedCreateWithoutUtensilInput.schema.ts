import * as z from 'zod';
import type { Prisma } from '@prisma/client';

const makeSchema = () =>
  z
    .object({
      userId: z.string(),
    })
    .strict();
export const UserUtensilUncheckedCreateWithoutUtensilInputObjectSchema: z.ZodType<Prisma.UserUtensilUncheckedCreateWithoutUtensilInput> =
  makeSchema() as unknown as z.ZodType<Prisma.UserUtensilUncheckedCreateWithoutUtensilInput>;
export const UserUtensilUncheckedCreateWithoutUtensilInputObjectZodSchema =
  makeSchema();
