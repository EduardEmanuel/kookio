import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserProfileCreateNestedOneWithoutUtensilsInputObjectSchema as UserProfileCreateNestedOneWithoutUtensilsInputObjectSchema } from './UserProfileCreateNestedOneWithoutUtensilsInput.schema';
import { UtensilCreateNestedOneWithoutUsersInputObjectSchema as UtensilCreateNestedOneWithoutUsersInputObjectSchema } from './UtensilCreateNestedOneWithoutUsersInput.schema';

const makeSchema = () =>
  z
    .object({
      user: z.lazy(
        () => UserProfileCreateNestedOneWithoutUtensilsInputObjectSchema,
      ),
      utensil: z.lazy(
        () => UtensilCreateNestedOneWithoutUsersInputObjectSchema,
      ),
    })
    .strict();
export const UserUtensilCreateInputObjectSchema: z.ZodType<Prisma.UserUtensilCreateInput> =
  makeSchema() as unknown as z.ZodType<Prisma.UserUtensilCreateInput>;
export const UserUtensilCreateInputObjectZodSchema = makeSchema();
