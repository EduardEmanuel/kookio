import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { UserUtensilWhereInputObjectSchema as UserUtensilWhereInputObjectSchema } from './objects/UserUtensilWhereInput.schema';

export const UserUtensilDeleteManySchema: z.ZodType<Prisma.UserUtensilDeleteManyArgs> =
  z
    .object({ where: UserUtensilWhereInputObjectSchema.optional() })
    .strict() as unknown as z.ZodType<Prisma.UserUtensilDeleteManyArgs>;

export const UserUtensilDeleteManyZodSchema = z
  .object({ where: UserUtensilWhereInputObjectSchema.optional() })
  .strict();
