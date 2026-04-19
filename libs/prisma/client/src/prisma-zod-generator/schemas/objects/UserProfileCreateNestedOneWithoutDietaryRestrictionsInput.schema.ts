import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserProfileCreateWithoutDietaryRestrictionsInputObjectSchema as UserProfileCreateWithoutDietaryRestrictionsInputObjectSchema } from './UserProfileCreateWithoutDietaryRestrictionsInput.schema';
import { UserProfileUncheckedCreateWithoutDietaryRestrictionsInputObjectSchema as UserProfileUncheckedCreateWithoutDietaryRestrictionsInputObjectSchema } from './UserProfileUncheckedCreateWithoutDietaryRestrictionsInput.schema';
import { UserProfileCreateOrConnectWithoutDietaryRestrictionsInputObjectSchema as UserProfileCreateOrConnectWithoutDietaryRestrictionsInputObjectSchema } from './UserProfileCreateOrConnectWithoutDietaryRestrictionsInput.schema';
import { UserProfileWhereUniqueInputObjectSchema as UserProfileWhereUniqueInputObjectSchema } from './UserProfileWhereUniqueInput.schema';

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
      connect: z.lazy(() => UserProfileWhereUniqueInputObjectSchema).optional(),
    })
    .strict();
export const UserProfileCreateNestedOneWithoutDietaryRestrictionsInputObjectSchema: z.ZodType<Prisma.UserProfileCreateNestedOneWithoutDietaryRestrictionsInput> =
  makeSchema() as unknown as z.ZodType<Prisma.UserProfileCreateNestedOneWithoutDietaryRestrictionsInput>;
export const UserProfileCreateNestedOneWithoutDietaryRestrictionsInputObjectZodSchema =
  makeSchema();
