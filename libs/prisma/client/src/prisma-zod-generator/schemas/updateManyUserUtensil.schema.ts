import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { UserUtensilUpdateManyMutationInputObjectSchema as UserUtensilUpdateManyMutationInputObjectSchema } from './objects/UserUtensilUpdateManyMutationInput.schema';
import { UserUtensilWhereInputObjectSchema as UserUtensilWhereInputObjectSchema } from './objects/UserUtensilWhereInput.schema';

export const UserUtensilUpdateManySchema: z.ZodType<Prisma.UserUtensilUpdateManyArgs> =
  z
    .object({
      data: UserUtensilUpdateManyMutationInputObjectSchema,
      where: UserUtensilWhereInputObjectSchema.optional(),
    })
    .strict() as unknown as z.ZodType<Prisma.UserUtensilUpdateManyArgs>;

export const UserUtensilUpdateManyZodSchema = z
  .object({
    data: UserUtensilUpdateManyMutationInputObjectSchema,
    where: UserUtensilWhereInputObjectSchema.optional(),
  })
  .strict();
