import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserProfileUpdateWithoutDietaryRestrictionsInputObjectSchema as UserProfileUpdateWithoutDietaryRestrictionsInputObjectSchema } from './UserProfileUpdateWithoutDietaryRestrictionsInput.schema';
import { UserProfileUncheckedUpdateWithoutDietaryRestrictionsInputObjectSchema as UserProfileUncheckedUpdateWithoutDietaryRestrictionsInputObjectSchema } from './UserProfileUncheckedUpdateWithoutDietaryRestrictionsInput.schema';
import { UserProfileCreateWithoutDietaryRestrictionsInputObjectSchema as UserProfileCreateWithoutDietaryRestrictionsInputObjectSchema } from './UserProfileCreateWithoutDietaryRestrictionsInput.schema';
import { UserProfileUncheckedCreateWithoutDietaryRestrictionsInputObjectSchema as UserProfileUncheckedCreateWithoutDietaryRestrictionsInputObjectSchema } from './UserProfileUncheckedCreateWithoutDietaryRestrictionsInput.schema';
import { UserProfileWhereInputObjectSchema as UserProfileWhereInputObjectSchema } from './UserProfileWhereInput.schema';

const makeSchema = () =>
  z
    .object({
      update: z.union([
        z.lazy(
          () => UserProfileUpdateWithoutDietaryRestrictionsInputObjectSchema,
        ),
        z.lazy(
          () =>
            UserProfileUncheckedUpdateWithoutDietaryRestrictionsInputObjectSchema,
        ),
      ]),
      create: z.union([
        z.lazy(
          () => UserProfileCreateWithoutDietaryRestrictionsInputObjectSchema,
        ),
        z.lazy(
          () =>
            UserProfileUncheckedCreateWithoutDietaryRestrictionsInputObjectSchema,
        ),
      ]),
      where: z.lazy(() => UserProfileWhereInputObjectSchema).optional(),
    })
    .strict();
export const UserProfileUpsertWithoutDietaryRestrictionsInputObjectSchema: z.ZodType<Prisma.UserProfileUpsertWithoutDietaryRestrictionsInput> =
  makeSchema() as unknown as z.ZodType<Prisma.UserProfileUpsertWithoutDietaryRestrictionsInput>;
export const UserProfileUpsertWithoutDietaryRestrictionsInputObjectZodSchema =
  makeSchema();
