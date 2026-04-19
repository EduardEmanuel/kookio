import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CookingSessionCreateWithoutUserInputObjectSchema as CookingSessionCreateWithoutUserInputObjectSchema } from './CookingSessionCreateWithoutUserInput.schema';
import { CookingSessionUncheckedCreateWithoutUserInputObjectSchema as CookingSessionUncheckedCreateWithoutUserInputObjectSchema } from './CookingSessionUncheckedCreateWithoutUserInput.schema';
import { CookingSessionCreateOrConnectWithoutUserInputObjectSchema as CookingSessionCreateOrConnectWithoutUserInputObjectSchema } from './CookingSessionCreateOrConnectWithoutUserInput.schema';
import { CookingSessionCreateManyUserInputEnvelopeObjectSchema as CookingSessionCreateManyUserInputEnvelopeObjectSchema } from './CookingSessionCreateManyUserInputEnvelope.schema';
import { CookingSessionWhereUniqueInputObjectSchema as CookingSessionWhereUniqueInputObjectSchema } from './CookingSessionWhereUniqueInput.schema';

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
      createMany: z
        .lazy(() => CookingSessionCreateManyUserInputEnvelopeObjectSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => CookingSessionWhereUniqueInputObjectSchema),
          z.lazy(() => CookingSessionWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
    })
    .strict();
export const CookingSessionCreateNestedManyWithoutUserInputObjectSchema: z.ZodType<Prisma.CookingSessionCreateNestedManyWithoutUserInput> =
  makeSchema() as unknown as z.ZodType<Prisma.CookingSessionCreateNestedManyWithoutUserInput>;
export const CookingSessionCreateNestedManyWithoutUserInputObjectZodSchema =
  makeSchema();
