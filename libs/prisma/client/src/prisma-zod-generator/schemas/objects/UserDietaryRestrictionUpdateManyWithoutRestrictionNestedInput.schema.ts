import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserDietaryRestrictionCreateWithoutRestrictionInputObjectSchema as UserDietaryRestrictionCreateWithoutRestrictionInputObjectSchema } from './UserDietaryRestrictionCreateWithoutRestrictionInput.schema';
import { UserDietaryRestrictionUncheckedCreateWithoutRestrictionInputObjectSchema as UserDietaryRestrictionUncheckedCreateWithoutRestrictionInputObjectSchema } from './UserDietaryRestrictionUncheckedCreateWithoutRestrictionInput.schema';
import { UserDietaryRestrictionCreateOrConnectWithoutRestrictionInputObjectSchema as UserDietaryRestrictionCreateOrConnectWithoutRestrictionInputObjectSchema } from './UserDietaryRestrictionCreateOrConnectWithoutRestrictionInput.schema';
import { UserDietaryRestrictionUpsertWithWhereUniqueWithoutRestrictionInputObjectSchema as UserDietaryRestrictionUpsertWithWhereUniqueWithoutRestrictionInputObjectSchema } from './UserDietaryRestrictionUpsertWithWhereUniqueWithoutRestrictionInput.schema';
import { UserDietaryRestrictionCreateManyRestrictionInputEnvelopeObjectSchema as UserDietaryRestrictionCreateManyRestrictionInputEnvelopeObjectSchema } from './UserDietaryRestrictionCreateManyRestrictionInputEnvelope.schema';
import { UserDietaryRestrictionWhereUniqueInputObjectSchema as UserDietaryRestrictionWhereUniqueInputObjectSchema } from './UserDietaryRestrictionWhereUniqueInput.schema';
import { UserDietaryRestrictionUpdateWithWhereUniqueWithoutRestrictionInputObjectSchema as UserDietaryRestrictionUpdateWithWhereUniqueWithoutRestrictionInputObjectSchema } from './UserDietaryRestrictionUpdateWithWhereUniqueWithoutRestrictionInput.schema';
import { UserDietaryRestrictionUpdateManyWithWhereWithoutRestrictionInputObjectSchema as UserDietaryRestrictionUpdateManyWithWhereWithoutRestrictionInputObjectSchema } from './UserDietaryRestrictionUpdateManyWithWhereWithoutRestrictionInput.schema';
import { UserDietaryRestrictionScalarWhereInputObjectSchema as UserDietaryRestrictionScalarWhereInputObjectSchema } from './UserDietaryRestrictionScalarWhereInput.schema';

const makeSchema = () =>
  z
    .object({
      create: z
        .union([
          z.lazy(
            () =>
              UserDietaryRestrictionCreateWithoutRestrictionInputObjectSchema,
          ),
          z
            .lazy(
              () =>
                UserDietaryRestrictionCreateWithoutRestrictionInputObjectSchema,
            )
            .array(),
          z.lazy(
            () =>
              UserDietaryRestrictionUncheckedCreateWithoutRestrictionInputObjectSchema,
          ),
          z
            .lazy(
              () =>
                UserDietaryRestrictionUncheckedCreateWithoutRestrictionInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(
            () =>
              UserDietaryRestrictionCreateOrConnectWithoutRestrictionInputObjectSchema,
          ),
          z
            .lazy(
              () =>
                UserDietaryRestrictionCreateOrConnectWithoutRestrictionInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(
            () =>
              UserDietaryRestrictionUpsertWithWhereUniqueWithoutRestrictionInputObjectSchema,
          ),
          z
            .lazy(
              () =>
                UserDietaryRestrictionUpsertWithWhereUniqueWithoutRestrictionInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(
          () =>
            UserDietaryRestrictionCreateManyRestrictionInputEnvelopeObjectSchema,
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
              UserDietaryRestrictionUpdateWithWhereUniqueWithoutRestrictionInputObjectSchema,
          ),
          z
            .lazy(
              () =>
                UserDietaryRestrictionUpdateWithWhereUniqueWithoutRestrictionInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(
            () =>
              UserDietaryRestrictionUpdateManyWithWhereWithoutRestrictionInputObjectSchema,
          ),
          z
            .lazy(
              () =>
                UserDietaryRestrictionUpdateManyWithWhereWithoutRestrictionInputObjectSchema,
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
export const UserDietaryRestrictionUpdateManyWithoutRestrictionNestedInputObjectSchema: z.ZodType<Prisma.UserDietaryRestrictionUpdateManyWithoutRestrictionNestedInput> =
  makeSchema() as unknown as z.ZodType<Prisma.UserDietaryRestrictionUpdateManyWithoutRestrictionNestedInput>;
export const UserDietaryRestrictionUpdateManyWithoutRestrictionNestedInputObjectZodSchema =
  makeSchema();
