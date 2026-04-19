import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserProfileWhereInputObjectSchema as UserProfileWhereInputObjectSchema } from './UserProfileWhereInput.schema';
import { UserProfileUpdateWithoutDietaryRestrictionsInputObjectSchema as UserProfileUpdateWithoutDietaryRestrictionsInputObjectSchema } from './UserProfileUpdateWithoutDietaryRestrictionsInput.schema';
import { UserProfileUncheckedUpdateWithoutDietaryRestrictionsInputObjectSchema as UserProfileUncheckedUpdateWithoutDietaryRestrictionsInputObjectSchema } from './UserProfileUncheckedUpdateWithoutDietaryRestrictionsInput.schema';

const makeSchema = () =>
  z
    .object({
      where: z.lazy(() => UserProfileWhereInputObjectSchema).optional(),
      data: z.union([
        z.lazy(
          () => UserProfileUpdateWithoutDietaryRestrictionsInputObjectSchema,
        ),
        z.lazy(
          () =>
            UserProfileUncheckedUpdateWithoutDietaryRestrictionsInputObjectSchema,
        ),
      ]),
    })
    .strict();
export const UserProfileUpdateToOneWithWhereWithoutDietaryRestrictionsInputObjectSchema: z.ZodType<Prisma.UserProfileUpdateToOneWithWhereWithoutDietaryRestrictionsInput> =
  makeSchema() as unknown as z.ZodType<Prisma.UserProfileUpdateToOneWithWhereWithoutDietaryRestrictionsInput>;
export const UserProfileUpdateToOneWithWhereWithoutDietaryRestrictionsInputObjectZodSchema =
  makeSchema();
