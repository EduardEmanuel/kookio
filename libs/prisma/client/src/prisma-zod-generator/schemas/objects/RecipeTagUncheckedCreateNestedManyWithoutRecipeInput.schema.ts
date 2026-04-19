import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RecipeTagCreateWithoutRecipeInputObjectSchema as RecipeTagCreateWithoutRecipeInputObjectSchema } from './RecipeTagCreateWithoutRecipeInput.schema';
import { RecipeTagUncheckedCreateWithoutRecipeInputObjectSchema as RecipeTagUncheckedCreateWithoutRecipeInputObjectSchema } from './RecipeTagUncheckedCreateWithoutRecipeInput.schema';
import { RecipeTagCreateOrConnectWithoutRecipeInputObjectSchema as RecipeTagCreateOrConnectWithoutRecipeInputObjectSchema } from './RecipeTagCreateOrConnectWithoutRecipeInput.schema';
import { RecipeTagCreateManyRecipeInputEnvelopeObjectSchema as RecipeTagCreateManyRecipeInputEnvelopeObjectSchema } from './RecipeTagCreateManyRecipeInputEnvelope.schema';
import { RecipeTagWhereUniqueInputObjectSchema as RecipeTagWhereUniqueInputObjectSchema } from './RecipeTagWhereUniqueInput.schema';

const makeSchema = () =>
  z
    .object({
      create: z
        .union([
          z.lazy(() => RecipeTagCreateWithoutRecipeInputObjectSchema),
          z.lazy(() => RecipeTagCreateWithoutRecipeInputObjectSchema).array(),
          z.lazy(() => RecipeTagUncheckedCreateWithoutRecipeInputObjectSchema),
          z
            .lazy(() => RecipeTagUncheckedCreateWithoutRecipeInputObjectSchema)
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => RecipeTagCreateOrConnectWithoutRecipeInputObjectSchema),
          z
            .lazy(() => RecipeTagCreateOrConnectWithoutRecipeInputObjectSchema)
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => RecipeTagCreateManyRecipeInputEnvelopeObjectSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => RecipeTagWhereUniqueInputObjectSchema),
          z.lazy(() => RecipeTagWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
    })
    .strict();
export const RecipeTagUncheckedCreateNestedManyWithoutRecipeInputObjectSchema: z.ZodType<Prisma.RecipeTagUncheckedCreateNestedManyWithoutRecipeInput> =
  makeSchema() as unknown as z.ZodType<Prisma.RecipeTagUncheckedCreateNestedManyWithoutRecipeInput>;
export const RecipeTagUncheckedCreateNestedManyWithoutRecipeInputObjectZodSchema =
  makeSchema();
