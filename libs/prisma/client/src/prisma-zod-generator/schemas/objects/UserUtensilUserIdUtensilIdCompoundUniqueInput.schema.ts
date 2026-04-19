import * as z from 'zod';
import type { Prisma } from '@prisma/client';

const makeSchema = () =>
  z
    .object({
      userId: z.string(),
      utensilId: z.string(),
    })
    .strict();
export const UserUtensilUserIdUtensilIdCompoundUniqueInputObjectSchema: z.ZodType<Prisma.UserUtensilUserIdUtensilIdCompoundUniqueInput> =
  makeSchema() as unknown as z.ZodType<Prisma.UserUtensilUserIdUtensilIdCompoundUniqueInput>;
export const UserUtensilUserIdUtensilIdCompoundUniqueInputObjectZodSchema =
  makeSchema();
