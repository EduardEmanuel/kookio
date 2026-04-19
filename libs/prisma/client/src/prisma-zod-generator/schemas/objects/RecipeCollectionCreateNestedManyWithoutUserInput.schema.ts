import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RecipeCollectionCreateWithoutUserInputObjectSchema as RecipeCollectionCreateWithoutUserInputObjectSchema } from './RecipeCollectionCreateWithoutUserInput.schema';
import { RecipeCollectionUncheckedCreateWithoutUserInputObjectSchema as RecipeCollectionUncheckedCreateWithoutUserInputObjectSchema } from './RecipeCollectionUncheckedCreateWithoutUserInput.schema';
import { RecipeCollectionCreateOrConnectWithoutUserInputObjectSchema as RecipeCollectionCreateOrConnectWithoutUserInputObjectSchema } from './RecipeCollectionCreateOrConnectWithoutUserInput.schema';
import { RecipeCollectionCreateManyUserInputEnvelopeObjectSchema as RecipeCollectionCreateManyUserInputEnvelopeObjectSchema } from './RecipeCollectionCreateManyUserInputEnvelope.schema';
import { RecipeCollectionWhereUniqueInputObjectSchema as RecipeCollectionWhereUniqueInputObjectSchema } from './RecipeCollectionWhereUniqueInput.schema';

const makeSchema = () =>
  z
    .object({
      create: z
        .union([
          z.lazy(() => RecipeCollectionCreateWithoutUserInputObjectSchema),
          z
            .lazy(() => RecipeCollectionCreateWithoutUserInputObjectSchema)
            .array(),
          z.lazy(
            () => RecipeCollectionUncheckedCreateWithoutUserInputObjectSchema,
          ),
          z
            .lazy(
              () => RecipeCollectionUncheckedCreateWithoutUserInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(
            () => RecipeCollectionCreateOrConnectWithoutUserInputObjectSchema,
          ),
          z
            .lazy(
              () => RecipeCollectionCreateOrConnectWithoutUserInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => RecipeCollectionCreateManyUserInputEnvelopeObjectSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => RecipeCollectionWhereUniqueInputObjectSchema),
          z.lazy(() => RecipeCollectionWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
    })
    .strict();
export const RecipeCollectionCreateNestedManyWithoutUserInputObjectSchema: z.ZodType<Prisma.RecipeCollectionCreateNestedManyWithoutUserInput> =
  makeSchema() as unknown as z.ZodType<Prisma.RecipeCollectionCreateNestedManyWithoutUserInput>;
export const RecipeCollectionCreateNestedManyWithoutUserInputObjectZodSchema =
  makeSchema();
