import * as z from 'zod';
import type { Prisma } from '@prisma/client';

const makeSchema = () =>
  z
    .object({
      utensilId: z.string(),
    })
    .strict();
export const UserUtensilUncheckedCreateWithoutUserInputObjectSchema: z.ZodType<Prisma.UserUtensilUncheckedCreateWithoutUserInput> =
  makeSchema() as unknown as z.ZodType<Prisma.UserUtensilUncheckedCreateWithoutUserInput>;
export const UserUtensilUncheckedCreateWithoutUserInputObjectZodSchema =
  makeSchema();
