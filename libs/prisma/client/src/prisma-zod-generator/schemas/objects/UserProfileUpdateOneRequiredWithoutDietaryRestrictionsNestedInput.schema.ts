import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserProfileCreateWithoutDietaryRestrictionsInputObjectSchema as UserProfileCreateWithoutDietaryRestrictionsInputObjectSchema } from './UserProfileCreateWithoutDietaryRestrictionsInput.schema';
import { UserProfileUncheckedCreateWithoutDietaryRestrictionsInputObjectSchema as UserProfileUncheckedCreateWithoutDietaryRestrictionsInputObjectSchema } from './UserProfileUncheckedCreateWithoutDietaryRestrictionsInput.schema';
import { UserProfileCreateOrConnectWithoutDietaryRestrictionsInputObjectSchema as UserProfileCreateOrConnectWithoutDietaryRestrictionsInputObjectSchema } from './UserProfileCreateOrConnectWithoutDietaryRestrictionsInput.schema';
import { UserProfileUpsertWithoutDietaryRestrictionsInputObjectSchema as UserProfileUpsertWithoutDietaryRestrictionsInputObjectSchema } from './UserProfileUpsertWithoutDietaryRestrictionsInput.schema';
import { UserProfileWhereUniqueInputObjectSchema as UserProfileWhereUniqueInputObjectSchema } from './UserProfileWhereUniqueInput.schema';
import { UserProfileUpdateToOneWithWhereWithoutDietaryRestrictionsInputObjectSchema as UserProfileUpdateToOneWithWhereWithoutDietaryRestrictionsInputObjectSchema } from './UserProfileUpdateToOneWithWhereWithoutDietaryRestrictionsInput.schema';
import { UserProfileUpdateWithoutDietaryRestrictionsInputObjectSchema as UserProfileUpdateWithoutDietaryRestrictionsInputObjectSchema } from './UserProfileUpdateWithoutDietaryRestrictionsInput.schema';
import { UserProfileUncheckedUpdateWithoutDietaryRestrictionsInputObjectSchema as UserProfileUncheckedUpdateWithoutDietaryRestrictionsInputObjectSchema } from './UserProfileUncheckedUpdateWithoutDietaryRestrictionsInput.schema';

const makeSchema = () =>
  z
    .object({
      create: z
        .union([
          z.lazy(
            () => UserProfileCreateWithoutDietaryRestrictionsInputObjectSchema,
          ),
          z.lazy(
            () =>
              UserProfileUncheckedCreateWithoutDietaryRestrictionsInputObjectSchema,
          ),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(
          () =>
            UserProfileCreateOrConnectWithoutDietaryRestrictionsInputObjectSchema,
        )
        .optional(),
      upsert: z
        .lazy(
          () => UserProfileUpsertWithoutDietaryRestrictionsInputObjectSchema,
        )
        .optional(),
      connect: z.lazy(() => UserProfileWhereUniqueInputObjectSchema).optional(),
      update: z
        .union([
          z.lazy(
            () =>
              UserProfileUpdateToOneWithWhereWithoutDietaryRestrictionsInputObjectSchema,
          ),
          z.lazy(
            () => UserProfileUpdateWithoutDietaryRestrictionsInputObjectSchema,
          ),
          z.lazy(
            () =>
              UserProfileUncheckedUpdateWithoutDietaryRestrictionsInputObjectSchema,
          ),
        ])
        .optional(),
    })
    .strict();
export const UserProfileUpdateOneRequiredWithoutDietaryRestrictionsNestedInputObjectSchema: z.ZodType<Prisma.UserProfileUpdateOneRequiredWithoutDietaryRestrictionsNestedInput> =
  makeSchema() as unknown as z.ZodType<Prisma.UserProfileUpdateOneRequiredWithoutDietaryRestrictionsNestedInput>;
export const UserProfileUpdateOneRequiredWithoutDietaryRestrictionsNestedInputObjectZodSchema =
  makeSchema();
