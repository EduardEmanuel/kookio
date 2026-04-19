import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CookingSessionCreateWithoutRecipeInputObjectSchema as CookingSessionCreateWithoutRecipeInputObjectSchema } from './CookingSessionCreateWithoutRecipeInput.schema';
import { CookingSessionUncheckedCreateWithoutRecipeInputObjectSchema as CookingSessionUncheckedCreateWithoutRecipeInputObjectSchema } from './CookingSessionUncheckedCreateWithoutRecipeInput.schema';
import { CookingSessionCreateOrConnectWithoutRecipeInputObjectSchema as CookingSessionCreateOrConnectWithoutRecipeInputObjectSchema } from './CookingSessionCreateOrConnectWithoutRecipeInput.schema';
import { CookingSessionUpsertWithWhereUniqueWithoutRecipeInputObjectSchema as CookingSessionUpsertWithWhereUniqueWithoutRecipeInputObjectSchema } from './CookingSessionUpsertWithWhereUniqueWithoutRecipeInput.schema';
import { CookingSessionCreateManyRecipeInputEnvelopeObjectSchema as CookingSessionCreateManyRecipeInputEnvelopeObjectSchema } from './CookingSessionCreateManyRecipeInputEnvelope.schema';
import { CookingSessionWhereUniqueInputObjectSchema as CookingSessionWhereUniqueInputObjectSchema } from './CookingSessionWhereUniqueInput.schema';
import { CookingSessionUpdateWithWhereUniqueWithoutRecipeInputObjectSchema as CookingSessionUpdateWithWhereUniqueWithoutRecipeInputObjectSchema } from './CookingSessionUpdateWithWhereUniqueWithoutRecipeInput.schema';
import { CookingSessionUpdateManyWithWhereWithoutRecipeInputObjectSchema as CookingSessionUpdateManyWithWhereWithoutRecipeInputObjectSchema } from './CookingSessionUpdateManyWithWhereWithoutRecipeInput.schema';
import { CookingSessionScalarWhereInputObjectSchema as CookingSessionScalarWhereInputObjectSchema } from './CookingSessionScalarWhereInput.schema';

const makeSchema = () =>
  z
    .object({
      create: z
        .union([
          z.lazy(() => CookingSessionCreateWithoutRecipeInputObjectSchema),
          z
            .lazy(() => CookingSessionCreateWithoutRecipeInputObjectSchema)
            .array(),
          z.lazy(
            () => CookingSessionUncheckedCreateWithoutRecipeInputObjectSchema,
          ),
          z
            .lazy(
              () => CookingSessionUncheckedCreateWithoutRecipeInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(
            () => CookingSessionCreateOrConnectWithoutRecipeInputObjectSchema,
          ),
          z
            .lazy(
              () => CookingSessionCreateOrConnectWithoutRecipeInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(
            () =>
              CookingSessionUpsertWithWhereUniqueWithoutRecipeInputObjectSchema,
          ),
          z
            .lazy(
              () =>
                CookingSessionUpsertWithWhereUniqueWithoutRecipeInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => CookingSessionCreateManyRecipeInputEnvelopeObjectSchema)
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
              CookingSessionUpdateWithWhereUniqueWithoutRecipeInputObjectSchema,
          ),
          z
            .lazy(
              () =>
                CookingSessionUpdateWithWhereUniqueWithoutRecipeInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(
            () =>
              CookingSessionUpdateManyWithWhereWithoutRecipeInputObjectSchema,
          ),
          z
            .lazy(
              () =>
                CookingSessionUpdateManyWithWhereWithoutRecipeInputObjectSchema,
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
export const CookingSessionUpdateManyWithoutRecipeNestedInputObjectSchema: z.ZodType<Prisma.CookingSessionUpdateManyWithoutRecipeNestedInput> =
  makeSchema() as unknown as z.ZodType<Prisma.CookingSessionUpdateManyWithoutRecipeNestedInput>;
export const CookingSessionUpdateManyWithoutRecipeNestedInputObjectZodSchema =
  makeSchema();
