import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UtensilCreateNestedOneWithoutUsersInputObjectSchema as UtensilCreateNestedOneWithoutUsersInputObjectSchema } from './UtensilCreateNestedOneWithoutUsersInput.schema';

const makeSchema = () =>
  z
    .object({
      utensil: z.lazy(
        () => UtensilCreateNestedOneWithoutUsersInputObjectSchema,
      ),
    })
    .strict();
export const UserUtensilCreateWithoutUserInputObjectSchema: z.ZodType<Prisma.UserUtensilCreateWithoutUserInput> =
  makeSchema() as unknown as z.ZodType<Prisma.UserUtensilCreateWithoutUserInput>;
export const UserUtensilCreateWithoutUserInputObjectZodSchema = makeSchema();
