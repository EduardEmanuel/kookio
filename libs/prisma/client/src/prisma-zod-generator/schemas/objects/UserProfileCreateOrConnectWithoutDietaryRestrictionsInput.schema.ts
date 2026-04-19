import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserProfileWhereUniqueInputObjectSchema as UserProfileWhereUniqueInputObjectSchema } from './UserProfileWhereUniqueInput.schema';
import { UserProfileCreateWithoutDietaryRestrictionsInputObjectSchema as UserProfileCreateWithoutDietaryRestrictionsInputObjectSchema } from './UserProfileCreateWithoutDietaryRestrictionsInput.schema';
import { UserProfileUncheckedCreateWithoutDietaryRestrictionsInputObjectSchema as UserProfileUncheckedCreateWithoutDietaryRestrictionsInputObjectSchema } from './UserProfileUncheckedCreateWithoutDietaryRestrictionsInput.schema';

const makeSchema = () =>
  z
    .object({
      where: z.lazy(() => UserProfileWhereUniqueInputObjectSchema),
      create: z.union([
        z.lazy(
          () => UserProfileCreateWithoutDietaryRestrictionsInputObjectSchema,
        ),
        z.lazy(
          () =>
            UserProfileUncheckedCreateWithoutDietaryRestrictionsInputObjectSchema,
        ),
      ]),
    })
    .strict();
export const UserProfileCreateOrConnectWithoutDietaryRestrictionsInputObjectSchema: z.ZodType<Prisma.UserProfileCreateOrConnectWithoutDietaryRestrictionsInput> =
  makeSchema() as unknown as z.ZodType<Prisma.UserProfileCreateOrConnectWithoutDietaryRestrictionsInput>;
export const UserProfileCreateOrConnectWithoutDietaryRestrictionsInputObjectZodSchema =
  makeSchema();
