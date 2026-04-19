import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserDietaryRestrictionCreateWithoutUserInputObjectSchema as UserDietaryRestrictionCreateWithoutUserInputObjectSchema } from './UserDietaryRestrictionCreateWithoutUserInput.schema';
import { UserDietaryRestrictionUncheckedCreateWithoutUserInputObjectSchema as UserDietaryRestrictionUncheckedCreateWithoutUserInputObjectSchema } from './UserDietaryRestrictionUncheckedCreateWithoutUserInput.schema';
import { UserDietaryRestrictionCreateOrConnectWithoutUserInputObjectSchema as UserDietaryRestrictionCreateOrConnectWithoutUserInputObjectSchema } from './UserDietaryRestrictionCreateOrConnectWithoutUserInput.schema';
import { UserDietaryRestrictionUpsertWithWhereUniqueWithoutUserInputObjectSchema as UserDietaryRestrictionUpsertWithWhereUniqueWithoutUserInputObjectSchema } from './UserDietaryRestrictionUpsertWithWhereUniqueWithoutUserInput.schema';
import { UserDietaryRestrictionCreateManyUserInputEnvelopeObjectSchema as UserDietaryRestrictionCreateManyUserInputEnvelopeObjectSchema } from './UserDietaryRestrictionCreateManyUserInputEnvelope.schema';
import { UserDietaryRestrictionWhereUniqueInputObjectSchema as UserDietaryRestrictionWhereUniqueInputObjectSchema } from './UserDietaryRestrictionWhereUniqueInput.schema';
import { UserDietaryRestrictionUpdateWithWhereUniqueWithoutUserInputObjectSchema as UserDietaryRestrictionUpdateWithWhereUniqueWithoutUserInputObjectSchema } from './UserDietaryRestrictionUpdateWithWhereUniqueWithoutUserInput.schema';
import { UserDietaryRestrictionUpdateManyWithWhereWithoutUserInputObjectSchema as UserDietaryRestrictionUpdateManyWithWhereWithoutUserInputObjectSchema } from './UserDietaryRestrictionUpdateManyWithWhereWithoutUserInput.schema';
import { UserDietaryRestrictionScalarWhereInputObjectSchema as UserDietaryRestrictionScalarWhereInputObjectSchema } from './UserDietaryRestrictionScalarWhereInput.schema';

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
      upsert: z
        .union([
          z.lazy(
            () =>
              UserDietaryRestrictionUpsertWithWhereUniqueWithoutUserInputObjectSchema,
          ),
          z
            .lazy(
              () =>
                UserDietaryRestrictionUpsertWithWhereUniqueWithoutUserInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(
          () => UserDietaryRestrictionCreateManyUserInputEnvelopeObjectSchema,
        )
        .optional(),
      set: z
        .union([
          z.lazy(() => UserDietaryRestrictionWhereUniqueInputObjectSchema),
          z
            .lazy(() => UserDietaryRestrictionWhereUniqueInputObjectSchema)
            .array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => UserDietaryRestrictionWhereUniqueInputObjectSchema),
          z
            .lazy(() => UserDietaryRestrictionWhereUniqueInputObjectSchema)
            .array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => UserDietaryRestrictionWhereUniqueInputObjectSchema),
          z
            .lazy(() => UserDietaryRestrictionWhereUniqueInputObjectSchema)
            .array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => UserDietaryRestrictionWhereUniqueInputObjectSchema),
          z
            .lazy(() => UserDietaryRestrictionWhereUniqueInputObjectSchema)
            .array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(
            () =>
              UserDietaryRestrictionUpdateWithWhereUniqueWithoutUserInputObjectSchema,
          ),
          z
            .lazy(
              () =>
                UserDietaryRestrictionUpdateWithWhereUniqueWithoutUserInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(
            () =>
              UserDietaryRestrictionUpdateManyWithWhereWithoutUserInputObjectSchema,
          ),
          z
            .lazy(
              () =>
                UserDietaryRestrictionUpdateManyWithWhereWithoutUserInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => UserDietaryRestrictionScalarWhereInputObjectSchema),
          z
            .lazy(() => UserDietaryRestrictionScalarWhereInputObjectSchema)
            .array(),
        ])
        .optional(),
    })
    .strict();
export const UserDietaryRestrictionUpdateManyWithoutUserNestedInputObjectSchema: z.ZodType<Prisma.UserDietaryRestrictionUpdateManyWithoutUserNestedInput> =
  makeSchema() as unknown as z.ZodType<Prisma.UserDietaryRestrictionUpdateManyWithoutUserNestedInput>;
export const UserDietaryRestrictionUpdateManyWithoutUserNestedInputObjectZodSchema =
  makeSchema();
