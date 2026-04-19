import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserProfileUpdateWithoutUtensilsInputObjectSchema as UserProfileUpdateWithoutUtensilsInputObjectSchema } from './UserProfileUpdateWithoutUtensilsInput.schema';
import { UserProfileUncheckedUpdateWithoutUtensilsInputObjectSchema as UserProfileUncheckedUpdateWithoutUtensilsInputObjectSchema } from './UserProfileUncheckedUpdateWithoutUtensilsInput.schema';
import { UserProfileCreateWithoutUtensilsInputObjectSchema as UserProfileCreateWithoutUtensilsInputObjectSchema } from './UserProfileCreateWithoutUtensilsInput.schema';
import { UserProfileUncheckedCreateWithoutUtensilsInputObjectSchema as UserProfileUncheckedCreateWithoutUtensilsInputObjectSchema } from './UserProfileUncheckedCreateWithoutUtensilsInput.schema';
import { UserProfileWhereInputObjectSchema as UserProfileWhereInputObjectSchema } from './UserProfileWhereInput.schema';

const makeSchema = () =>
  z
    .object({
      update: z.union([
        z.lazy(() => UserProfileUpdateWithoutUtensilsInputObjectSchema),
        z.lazy(
          () => UserProfileUncheckedUpdateWithoutUtensilsInputObjectSchema,
        ),
      ]),
      create: z.union([
        z.lazy(() => UserProfileCreateWithoutUtensilsInputObjectSchema),
        z.lazy(
          () => UserProfileUncheckedCreateWithoutUtensilsInputObjectSchema,
        ),
      ]),
      where: z.lazy(() => UserProfileWhereInputObjectSchema).optional(),
    })
    .strict();
export const UserProfileUpsertWithoutUtensilsInputObjectSchema: z.ZodType<Prisma.UserProfileUpsertWithoutUtensilsInput> =
  makeSchema() as unknown as z.ZodType<Prisma.UserProfileUpsertWithoutUtensilsInput>;
export const UserProfileUpsertWithoutUtensilsInputObjectZodSchema =
  makeSchema();
