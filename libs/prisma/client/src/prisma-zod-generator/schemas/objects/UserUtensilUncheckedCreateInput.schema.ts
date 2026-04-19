import * as z from 'zod';
import type { Prisma } from '@prisma/client';

const makeSchema = () =>
  z
    .object({
      userId: z.string(),
      utensilId: z.string(),
    })
    .strict();
export const UserUtensilUncheckedCreateInputObjectSchema: z.ZodType<Prisma.UserUtensilUncheckedCreateInput> =
  makeSchema() as unknown as z.ZodType<Prisma.UserUtensilUncheckedCreateInput>;
export const UserUtensilUncheckedCreateInputObjectZodSchema = makeSchema();
