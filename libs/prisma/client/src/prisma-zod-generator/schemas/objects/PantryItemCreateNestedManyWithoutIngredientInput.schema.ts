import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PantryItemCreateWithoutIngredientInputObjectSchema as PantryItemCreateWithoutIngredientInputObjectSchema } from './PantryItemCreateWithoutIngredientInput.schema';
import { PantryItemUncheckedCreateWithoutIngredientInputObjectSchema as PantryItemUncheckedCreateWithoutIngredientInputObjectSchema } from './PantryItemUncheckedCreateWithoutIngredientInput.schema';
import { PantryItemCreateOrConnectWithoutIngredientInputObjectSchema as PantryItemCreateOrConnectWithoutIngredientInputObjectSchema } from './PantryItemCreateOrConnectWithoutIngredientInput.schema';
import { PantryItemCreateManyIngredientInputEnvelopeObjectSchema as PantryItemCreateManyIngredientInputEnvelopeObjectSchema } from './PantryItemCreateManyIngredientInputEnvelope.schema';
import { PantryItemWhereUniqueInputObjectSchema as PantryItemWhereUniqueInputObjectSchema } from './PantryItemWhereUniqueInput.schema';

const makeSchema = () =>
  z
    .object({
      create: z
        .union([
          z.lazy(() => PantryItemCreateWithoutIngredientInputObjectSchema),
          z
            .lazy(() => PantryItemCreateWithoutIngredientInputObjectSchema)
            .array(),
          z.lazy(
            () => PantryItemUncheckedCreateWithoutIngredientInputObjectSchema,
          ),
          z
            .lazy(
              () => PantryItemUncheckedCreateWithoutIngredientInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(
            () => PantryItemCreateOrConnectWithoutIngredientInputObjectSchema,
          ),
          z
            .lazy(
              () => PantryItemCreateOrConnectWithoutIngredientInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => PantryItemCreateManyIngredientInputEnvelopeObjectSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => PantryItemWhereUniqueInputObjectSchema),
          z.lazy(() => PantryItemWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
    })
    .strict();
export const PantryItemCreateNestedManyWithoutIngredientInputObjectSchema: z.ZodType<Prisma.PantryItemCreateNestedManyWithoutIngredientInput> =
  makeSchema() as unknown as z.ZodType<Prisma.PantryItemCreateNestedManyWithoutIngredientInput>;
export const PantryItemCreateNestedManyWithoutIngredientInputObjectZodSchema =
  makeSchema();
