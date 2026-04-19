import * as z from 'zod';
import type { Prisma } from '@prisma/client';

const makeSchema = () =>
  z
    .object({
      userId: z.string(),
    })
    .strict();
export const UserUtensilCreateManyUtensilInputObjectSchema: z.ZodType<Prisma.UserUtensilCreateManyUtensilInput> =
  makeSchema() as unknown as z.ZodType<Prisma.UserUtensilCreateManyUtensilInput>;
export const UserUtensilCreateManyUtensilInputObjectZodSchema = makeSchema();
