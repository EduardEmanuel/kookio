import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserProfileCreateNestedOneWithoutUtensilsInputObjectSchema as UserProfileCreateNestedOneWithoutUtensilsInputObjectSchema } from './UserProfileCreateNestedOneWithoutUtensilsInput.schema';

const makeSchema = () =>
  z
    .object({
      user: z.lazy(
        () => UserProfileCreateNestedOneWithoutUtensilsInputObjectSchema,
      ),
    })
    .strict();
export const UserUtensilCreateWithoutUtensilInputObjectSchema: z.ZodType<Prisma.UserUtensilCreateWithoutUtensilInput> =
  makeSchema() as unknown as z.ZodType<Prisma.UserUtensilCreateWithoutUtensilInput>;
export const UserUtensilCreateWithoutUtensilInputObjectZodSchema = makeSchema();
