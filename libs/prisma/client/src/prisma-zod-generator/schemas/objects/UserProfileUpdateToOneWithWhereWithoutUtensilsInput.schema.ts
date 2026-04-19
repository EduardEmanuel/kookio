import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserProfileWhereInputObjectSchema as UserProfileWhereInputObjectSchema } from './UserProfileWhereInput.schema';
import { UserProfileUpdateWithoutUtensilsInputObjectSchema as UserProfileUpdateWithoutUtensilsInputObjectSchema } from './UserProfileUpdateWithoutUtensilsInput.schema';
import { UserProfileUncheckedUpdateWithoutUtensilsInputObjectSchema as UserProfileUncheckedUpdateWithoutUtensilsInputObjectSchema } from './UserProfileUncheckedUpdateWithoutUtensilsInput.schema';

const makeSchema = () =>
  z
    .object({
      where: z.lazy(() => UserProfileWhereInputObjectSchema).optional(),
      data: z.union([
        z.lazy(() => UserProfileUpdateWithoutUtensilsInputObjectSchema),
        z.lazy(
          () => UserProfileUncheckedUpdateWithoutUtensilsInputObjectSchema,
        ),
      ]),
    })
    .strict();
export const UserProfileUpdateToOneWithWhereWithoutUtensilsInputObjectSchema: z.ZodType<Prisma.UserProfileUpdateToOneWithWhereWithoutUtensilsInput> =
  makeSchema() as unknown as z.ZodType<Prisma.UserProfileUpdateToOneWithWhereWithoutUtensilsInput>;
export const UserProfileUpdateToOneWithWhereWithoutUtensilsInputObjectZodSchema =
  makeSchema();
