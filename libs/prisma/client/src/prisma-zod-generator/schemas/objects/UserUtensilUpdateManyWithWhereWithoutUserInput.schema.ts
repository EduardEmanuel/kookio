import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserUtensilScalarWhereInputObjectSchema as UserUtensilScalarWhereInputObjectSchema } from './UserUtensilScalarWhereInput.schema';
import { UserUtensilUpdateManyMutationInputObjectSchema as UserUtensilUpdateManyMutationInputObjectSchema } from './UserUtensilUpdateManyMutationInput.schema';
import { UserUtensilUncheckedUpdateManyWithoutUserInputObjectSchema as UserUtensilUncheckedUpdateManyWithoutUserInputObjectSchema } from './UserUtensilUncheckedUpdateManyWithoutUserInput.schema';

const makeSchema = () =>
  z
    .object({
      where: z.lazy(() => UserUtensilScalarWhereInputObjectSchema),
      data: z.union([
        z.lazy(() => UserUtensilUpdateManyMutationInputObjectSchema),
        z.lazy(
          () => UserUtensilUncheckedUpdateManyWithoutUserInputObjectSchema,
        ),
      ]),
    })
    .strict();
export const UserUtensilUpdateManyWithWhereWithoutUserInputObjectSchema: z.ZodType<Prisma.UserUtensilUpdateManyWithWhereWithoutUserInput> =
  makeSchema() as unknown as z.ZodType<Prisma.UserUtensilUpdateManyWithWhereWithoutUserInput>;
export const UserUtensilUpdateManyWithWhereWithoutUserInputObjectZodSchema =
  makeSchema();
