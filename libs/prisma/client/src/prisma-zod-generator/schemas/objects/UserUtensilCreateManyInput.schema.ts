import * as z from 'zod';
import type { Prisma } from '@prisma/client';

const makeSchema = () =>
  z
    .object({
      userId: z.string(),
      utensilId: z.string(),
    })
    .strict();
export const UserUtensilCreateManyInputObjectSchema: z.ZodType<Prisma.UserUtensilCreateManyInput> =
  makeSchema() as unknown as z.ZodType<Prisma.UserUtensilCreateManyInput>;
export const UserUtensilCreateManyInputObjectZodSchema = makeSchema();
