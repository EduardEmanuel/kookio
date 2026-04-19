import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserUtensilScalarWhereInputObjectSchema as UserUtensilScalarWhereInputObjectSchema } from './UserUtensilScalarWhereInput.schema';
import { UserUtensilUpdateManyMutationInputObjectSchema as UserUtensilUpdateManyMutationInputObjectSchema } from './UserUtensilUpdateManyMutationInput.schema';
import { UserUtensilUncheckedUpdateManyWithoutUtensilInputObjectSchema as UserUtensilUncheckedUpdateManyWithoutUtensilInputObjectSchema } from './UserUtensilUncheckedUpdateManyWithoutUtensilInput.schema';

const makeSchema = () =>
  z
    .object({
      where: z.lazy(() => UserUtensilScalarWhereInputObjectSchema),
      data: z.union([
        z.lazy(() => UserUtensilUpdateManyMutationInputObjectSchema),
        z.lazy(
          () => UserUtensilUncheckedUpdateManyWithoutUtensilInputObjectSchema,
        ),
      ]),
    })
    .strict();
export const UserUtensilUpdateManyWithWhereWithoutUtensilInputObjectSchema: z.ZodType<Prisma.UserUtensilUpdateManyWithWhereWithoutUtensilInput> =
  makeSchema() as unknown as z.ZodType<Prisma.UserUtensilUpdateManyWithWhereWithoutUtensilInput>;
export const UserUtensilUpdateManyWithWhereWithoutUtensilInputObjectZodSchema =
  makeSchema();
