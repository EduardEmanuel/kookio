import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserDietaryRestrictionCreateWithoutRestrictionInputObjectSchema as UserDietaryRestrictionCreateWithoutRestrictionInputObjectSchema } from './UserDietaryRestrictionCreateWithoutRestrictionInput.schema';
import { UserDietaryRestrictionUncheckedCreateWithoutRestrictionInputObjectSchema as UserDietaryRestrictionUncheckedCreateWithoutRestrictionInputObjectSchema } from './UserDietaryRestrictionUncheckedCreateWithoutRestrictionInput.schema';
import { UserDietaryRestrictionCreateOrConnectWithoutRestrictionInputObjectSchema as UserDietaryRestrictionCreateOrConnectWithoutRestrictionInputObjectSchema } from './UserDietaryRestrictionCreateOrConnectWithoutRestrictionInput.schema';
import { UserDietaryRestrictionCreateManyRestrictionInputEnvelopeObjectSchema as UserDietaryRestrictionCreateManyRestrictionInputEnvelopeObjectSchema } from './UserDietaryRestrictionCreateManyRestrictionInputEnvelope.schema';
import { UserDietaryRestrictionWhereUniqueInputObjectSchema as UserDietaryRestrictionWhereUniqueInputObjectSchema } from './UserDietaryRestrictionWhereUniqueInput.schema';

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
      createMany: z
        .lazy(
          () =>
            UserDietaryRestrictionCreateManyRestrictionInputEnvelopeObjectSchema,
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
export const UserDietaryRestrictionUncheckedCreateNestedManyWithoutRestrictionInputObjectSchema: z.ZodType<Prisma.UserDietaryRestrictionUncheckedCreateNestedManyWithoutRestrictionInput> =
  makeSchema() as unknown as z.ZodType<Prisma.UserDietaryRestrictionUncheckedCreateNestedManyWithoutRestrictionInput>;
export const UserDietaryRestrictionUncheckedCreateNestedManyWithoutRestrictionInputObjectZodSchema =
  makeSchema();
