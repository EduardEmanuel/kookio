import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CookingSessionCreateWithoutUserInputObjectSchema as CookingSessionCreateWithoutUserInputObjectSchema } from './CookingSessionCreateWithoutUserInput.schema';
import { CookingSessionUncheckedCreateWithoutUserInputObjectSchema as CookingSessionUncheckedCreateWithoutUserInputObjectSchema } from './CookingSessionUncheckedCreateWithoutUserInput.schema';
import { CookingSessionCreateOrConnectWithoutUserInputObjectSchema as CookingSessionCreateOrConnectWithoutUserInputObjectSchema } from './CookingSessionCreateOrConnectWithoutUserInput.schema';
import { CookingSessionUpsertWithWhereUniqueWithoutUserInputObjectSchema as CookingSessionUpsertWithWhereUniqueWithoutUserInputObjectSchema } from './CookingSessionUpsertWithWhereUniqueWithoutUserInput.schema';
import { CookingSessionCreateManyUserInputEnvelopeObjectSchema as CookingSessionCreateManyUserInputEnvelopeObjectSchema } from './CookingSessionCreateManyUserInputEnvelope.schema';
import { CookingSessionWhereUniqueInputObjectSchema as CookingSessionWhereUniqueInputObjectSchema } from './CookingSessionWhereUniqueInput.schema';
import { CookingSessionUpdateWithWhereUniqueWithoutUserInputObjectSchema as CookingSessionUpdateWithWhereUniqueWithoutUserInputObjectSchema } from './CookingSessionUpdateWithWhereUniqueWithoutUserInput.schema';
import { CookingSessionUpdateManyWithWhereWithoutUserInputObjectSchema as CookingSessionUpdateManyWithWhereWithoutUserInputObjectSchema } from './CookingSessionUpdateManyWithWhereWithoutUserInput.schema';
import { CookingSessionScalarWhereInputObjectSchema as CookingSessionScalarWhereInputObjectSchema } from './CookingSessionScalarWhereInput.schema';

const makeSchema = () =>
  z
    .object({
      create: z
        .union([
          z.lazy(() => CookingSessionCreateWithoutUserInputObjectSchema),
          z
            .lazy(() => CookingSessionCreateWithoutUserInputObjectSchema)
            .array(),
          z.lazy(
            () => CookingSessionUncheckedCreateWithoutUserInputObjectSchema,
          ),
          z
            .lazy(
              () => CookingSessionUncheckedCreateWithoutUserInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(
            () => CookingSessionCreateOrConnectWithoutUserInputObjectSchema,
          ),
          z
            .lazy(
              () => CookingSessionCreateOrConnectWithoutUserInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(
            () =>
              CookingSessionUpsertWithWhereUniqueWithoutUserInputObjectSchema,
          ),
          z
            .lazy(
              () =>
                CookingSessionUpsertWithWhereUniqueWithoutUserInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => CookingSessionCreateManyUserInputEnvelopeObjectSchema)
        .optional(),
      set: z
        .union([
          z.lazy(() => CookingSessionWhereUniqueInputObjectSchema),
          z.lazy(() => CookingSessionWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => CookingSessionWhereUniqueInputObjectSchema),
          z.lazy(() => CookingSessionWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => CookingSessionWhereUniqueInputObjectSchema),
          z.lazy(() => CookingSessionWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => CookingSessionWhereUniqueInputObjectSchema),
          z.lazy(() => CookingSessionWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(
            () =>
              CookingSessionUpdateWithWhereUniqueWithoutUserInputObjectSchema,
          ),
          z
            .lazy(
              () =>
                CookingSessionUpdateWithWhereUniqueWithoutUserInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(
            () => CookingSessionUpdateManyWithWhereWithoutUserInputObjectSchema,
          ),
          z
            .lazy(
              () =>
                CookingSessionUpdateManyWithWhereWithoutUserInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => CookingSessionScalarWhereInputObjectSchema),
          z.lazy(() => CookingSessionScalarWhereInputObjectSchema).array(),
        ])
        .optional(),
    })
    .strict();
export const CookingSessionUncheckedUpdateManyWithoutUserNestedInputObjectSchema: z.ZodType<Prisma.CookingSessionUncheckedUpdateManyWithoutUserNestedInput> =
  makeSchema() as unknown as z.ZodType<Prisma.CookingSessionUncheckedUpdateManyWithoutUserNestedInput>;
export const CookingSessionUncheckedUpdateManyWithoutUserNestedInputObjectZodSchema =
  makeSchema();
