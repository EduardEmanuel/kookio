import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PantryItemCreateWithoutUserInputObjectSchema as PantryItemCreateWithoutUserInputObjectSchema } from './PantryItemCreateWithoutUserInput.schema';
import { PantryItemUncheckedCreateWithoutUserInputObjectSchema as PantryItemUncheckedCreateWithoutUserInputObjectSchema } from './PantryItemUncheckedCreateWithoutUserInput.schema';
import { PantryItemCreateOrConnectWithoutUserInputObjectSchema as PantryItemCreateOrConnectWithoutUserInputObjectSchema } from './PantryItemCreateOrConnectWithoutUserInput.schema';
import { PantryItemCreateManyUserInputEnvelopeObjectSchema as PantryItemCreateManyUserInputEnvelopeObjectSchema } from './PantryItemCreateManyUserInputEnvelope.schema';
import { PantryItemWhereUniqueInputObjectSchema as PantryItemWhereUniqueInputObjectSchema } from './PantryItemWhereUniqueInput.schema';

const makeSchema = () =>
  z
    .object({
      create: z
        .union([
          z.lazy(() => PantryItemCreateWithoutUserInputObjectSchema),
          z.lazy(() => PantryItemCreateWithoutUserInputObjectSchema).array(),
          z.lazy(() => PantryItemUncheckedCreateWithoutUserInputObjectSchema),
          z
            .lazy(() => PantryItemUncheckedCreateWithoutUserInputObjectSchema)
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => PantryItemCreateOrConnectWithoutUserInputObjectSchema),
          z
            .lazy(() => PantryItemCreateOrConnectWithoutUserInputObjectSchema)
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => PantryItemCreateManyUserInputEnvelopeObjectSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => PantryItemWhereUniqueInputObjectSchema),
          z.lazy(() => PantryItemWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
    })
    .strict();
export const PantryItemCreateNestedManyWithoutUserInputObjectSchema: z.ZodType<Prisma.PantryItemCreateNestedManyWithoutUserInput> =
  makeSchema() as unknown as z.ZodType<Prisma.PantryItemCreateNestedManyWithoutUserInput>;
export const PantryItemCreateNestedManyWithoutUserInputObjectZodSchema =
  makeSchema();
