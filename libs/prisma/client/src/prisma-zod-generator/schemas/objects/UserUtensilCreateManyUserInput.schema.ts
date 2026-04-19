import * as z from 'zod';
import type { Prisma } from '@prisma/client';

const makeSchema = () =>
  z
    .object({
      utensilId: z.string(),
    })
    .strict();
export const UserUtensilCreateManyUserInputObjectSchema: z.ZodType<Prisma.UserUtensilCreateManyUserInput> =
  makeSchema() as unknown as z.ZodType<Prisma.UserUtensilCreateManyUserInput>;
export const UserUtensilCreateManyUserInputObjectZodSchema = makeSchema();
