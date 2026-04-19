import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { UserUtensilSelectObjectSchema as UserUtensilSelectObjectSchema } from './objects/UserUtensilSelect.schema';
import { UserUtensilUpdateManyMutationInputObjectSchema as UserUtensilUpdateManyMutationInputObjectSchema } from './objects/UserUtensilUpdateManyMutationInput.schema';
import { UserUtensilWhereInputObjectSchema as UserUtensilWhereInputObjectSchema } from './objects/UserUtensilWhereInput.schema';

export const UserUtensilUpdateManyAndReturnSchema: z.ZodType<Prisma.UserUtensilUpdateManyAndReturnArgs> =
  z
    .object({
      select: UserUtensilSelectObjectSchema.optional(),
      data: UserUtensilUpdateManyMutationInputObjectSchema,
      where: UserUtensilWhereInputObjectSchema.optional(),
    })
    .strict() as unknown as z.ZodType<Prisma.UserUtensilUpdateManyAndReturnArgs>;

export const UserUtensilUpdateManyAndReturnZodSchema = z
  .object({
    select: UserUtensilSelectObjectSchema.optional(),
    data: UserUtensilUpdateManyMutationInputObjectSchema,
    where: UserUtensilWhereInputObjectSchema.optional(),
  })
  .strict();
