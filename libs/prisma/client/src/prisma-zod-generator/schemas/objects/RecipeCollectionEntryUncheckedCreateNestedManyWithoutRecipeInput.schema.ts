import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RecipeCollectionEntryCreateWithoutRecipeInputObjectSchema as RecipeCollectionEntryCreateWithoutRecipeInputObjectSchema } from './RecipeCollectionEntryCreateWithoutRecipeInput.schema';
import { RecipeCollectionEntryUncheckedCreateWithoutRecipeInputObjectSchema as RecipeCollectionEntryUncheckedCreateWithoutRecipeInputObjectSchema } from './RecipeCollectionEntryUncheckedCreateWithoutRecipeInput.schema';
import { RecipeCollectionEntryCreateOrConnectWithoutRecipeInputObjectSchema as RecipeCollectionEntryCreateOrConnectWithoutRecipeInputObjectSchema } from './RecipeCollectionEntryCreateOrConnectWithoutRecipeInput.schema';
import { RecipeCollectionEntryCreateManyRecipeInputEnvelopeObjectSchema as RecipeCollectionEntryCreateManyRecipeInputEnvelopeObjectSchema } from './RecipeCollectionEntryCreateManyRecipeInputEnvelope.schema';
import { RecipeCollectionEntryWhereUniqueInputObjectSchema as RecipeCollectionEntryWhereUniqueInputObjectSchema } from './RecipeCollectionEntryWhereUniqueInput.schema';

const makeSchema = () =>
  z
    .object({
      create: z
        .union([
          z.lazy(
            () => RecipeCollectionEntryCreateWithoutRecipeInputObjectSchema,
          ),
          z
            .lazy(
              () => RecipeCollectionEntryCreateWithoutRecipeInputObjectSchema,
            )
            .array(),
          z.lazy(
            () =>
              RecipeCollectionEntryUncheckedCreateWithoutRecipeInputObjectSchema,
          ),
          z
            .lazy(
              () =>
                RecipeCollectionEntryUncheckedCreateWithoutRecipeInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(
            () =>
              RecipeCollectionEntryCreateOrConnectWithoutRecipeInputObjectSchema,
          ),
          z
            .lazy(
              () =>
                RecipeCollectionEntryCreateOrConnectWithoutRecipeInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(
          () => RecipeCollectionEntryCreateManyRecipeInputEnvelopeObjectSchema,
        )
        .optional(),
      connect: z
        .union([
          z.lazy(() => RecipeCollectionEntryWhereUniqueInputObjectSchema),
          z
            .lazy(() => RecipeCollectionEntryWhereUniqueInputObjectSchema)
            .array(),
        ])
        .optional(),
    })
    .strict();
export const RecipeCollectionEntryUncheckedCreateNestedManyWithoutRecipeInputObjectSchema: z.ZodType<Prisma.RecipeCollectionEntryUncheckedCreateNestedManyWithoutRecipeInput> =
  makeSchema() as unknown as z.ZodType<Prisma.RecipeCollectionEntryUncheckedCreateNestedManyWithoutRecipeInput>;
export const RecipeCollectionEntryUncheckedCreateNestedManyWithoutRecipeInputObjectZodSchema =
  makeSchema();
