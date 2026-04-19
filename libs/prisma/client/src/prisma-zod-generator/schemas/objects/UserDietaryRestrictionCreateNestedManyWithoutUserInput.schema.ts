import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserDietaryRestrictionCreateWithoutUserInputObjectSchema as UserDietaryRestrictionCreateWithoutUserInputObjectSchema } from './UserDietaryRestrictionCreateWithoutUserInput.schema';
import { UserDietaryRestrictionUncheckedCreateWithoutUserInputObjectSchema as UserDietaryRestrictionUncheckedCreateWithoutUserInputObjectSchema } from './UserDietaryRestrictionUncheckedCreateWithoutUserInput.schema';
import { UserDietaryRestrictionCreateOrConnectWithoutUserInputObjectSchema as UserDietaryRestrictionCreateOrConnectWithoutUserInputObjectSchema } from './UserDietaryRestrictionCreateOrConnectWithoutUserInput.schema';
import { UserDietaryRestrictionCreateManyUserInputEnvelopeObjectSchema as UserDietaryRestrictionCreateManyUserInputEnvelopeObjectSchema } from './UserDietaryRestrictionCreateManyUserInputEnvelope.schema';
import { UserDietaryRestrictionWhereUniqueInputObjectSchema as UserDietaryRestrictionWhereUniqueInputObjectSchema } from './UserDietaryRestrictionWhereUniqueInput.schema';

const makeSchema = () =>
  z
    .object({
      create: z
        .union([
          z.lazy(
            () => UserDietaryRestrictionCreateWithoutUserInputObjectSchema,
          ),
          z
            .lazy(
              () => UserDietaryRestrictionCreateWithoutUserInputObjectSchema,
            )
            .array(),
          z.lazy(
            () =>
              UserDietaryRestrictionUncheckedCreateWithoutUserInputObjectSchema,
          ),
          z
            .lazy(
              () =>
                UserDietaryRestrictionUncheckedCreateWithoutUserInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(
            () =>
              UserDietaryRestrictionCreateOrConnectWithoutUserInputObjectSchema,
          ),
          z
            .lazy(
              () =>
                UserDietaryRestrictionCreateOrConnectWithoutUserInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(
          () => UserDietaryRestrictionCreateManyUserInputEnvelopeObjectSchema,
        )
        .optional(),
      connect: z
        .union([
          z.lazy(() => UserDietaryRestrictionWhereUniqueInputObjectSchema),
          z
            .lazy(() => UserDietaryRestrictionWhereUniqueInputObjectSchema)
            .array(),
        ])
        .optional(),
    })
    .strict();
export const UserDietaryRestrictionCreateNestedManyWithoutUserInputObjectSchema: z.ZodType<Prisma.UserDietaryRestrictionCreateNestedManyWithoutUserInput> =
  makeSchema() as unknown as z.ZodType<Prisma.UserDietaryRestrictionCreateNestedManyWithoutUserInput>;
export const UserDietaryRestrictionCreateNestedManyWithoutUserInputObjectZodSchema =
  makeSchema();
