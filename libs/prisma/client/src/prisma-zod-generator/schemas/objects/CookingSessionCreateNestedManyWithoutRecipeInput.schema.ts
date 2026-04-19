import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CookingSessionCreateWithoutRecipeInputObjectSchema as CookingSessionCreateWithoutRecipeInputObjectSchema } from './CookingSessionCreateWithoutRecipeInput.schema';
import { CookingSessionUncheckedCreateWithoutRecipeInputObjectSchema as CookingSessionUncheckedCreateWithoutRecipeInputObjectSchema } from './CookingSessionUncheckedCreateWithoutRecipeInput.schema';
import { CookingSessionCreateOrConnectWithoutRecipeInputObjectSchema as CookingSessionCreateOrConnectWithoutRecipeInputObjectSchema } from './CookingSessionCreateOrConnectWithoutRecipeInput.schema';
import { CookingSessionCreateManyRecipeInputEnvelopeObjectSchema as CookingSessionCreateManyRecipeInputEnvelopeObjectSchema } from './CookingSessionCreateManyRecipeInputEnvelope.schema';
import { CookingSessionWhereUniqueInputObjectSchema as CookingSessionWhereUniqueInputObjectSchema } from './CookingSessionWhereUniqueInput.schema';

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
      createMany: z
        .lazy(() => CookingSessionCreateManyRecipeInputEnvelopeObjectSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => CookingSessionWhereUniqueInputObjectSchema),
          z.lazy(() => CookingSessionWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
    })
    .strict();
export const CookingSessionCreateNestedManyWithoutRecipeInputObjectSchema: z.ZodType<Prisma.CookingSessionCreateNestedManyWithoutRecipeInput> =
  makeSchema() as unknown as z.ZodType<Prisma.CookingSessionCreateNestedManyWithoutRecipeInput>;
export const CookingSessionCreateNestedManyWithoutRecipeInputObjectZodSchema =
  makeSchema();
