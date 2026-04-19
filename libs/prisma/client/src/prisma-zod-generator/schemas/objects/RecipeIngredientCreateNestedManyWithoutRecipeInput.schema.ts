import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RecipeIngredientCreateWithoutRecipeInputObjectSchema as RecipeIngredientCreateWithoutRecipeInputObjectSchema } from './RecipeIngredientCreateWithoutRecipeInput.schema';
import { RecipeIngredientUncheckedCreateWithoutRecipeInputObjectSchema as RecipeIngredientUncheckedCreateWithoutRecipeInputObjectSchema } from './RecipeIngredientUncheckedCreateWithoutRecipeInput.schema';
import { RecipeIngredientCreateOrConnectWithoutRecipeInputObjectSchema as RecipeIngredientCreateOrConnectWithoutRecipeInputObjectSchema } from './RecipeIngredientCreateOrConnectWithoutRecipeInput.schema';
import { RecipeIngredientCreateManyRecipeInputEnvelopeObjectSchema as RecipeIngredientCreateManyRecipeInputEnvelopeObjectSchema } from './RecipeIngredientCreateManyRecipeInputEnvelope.schema';
import { RecipeIngredientWhereUniqueInputObjectSchema as RecipeIngredientWhereUniqueInputObjectSchema } from './RecipeIngredientWhereUniqueInput.schema';

const makeSchema = () =>
  z
    .object({
      create: z
        .union([
          z.lazy(() => RecipeIngredientCreateWithoutRecipeInputObjectSchema),
          z
            .lazy(() => RecipeIngredientCreateWithoutRecipeInputObjectSchema)
            .array(),
          z.lazy(
            () => RecipeIngredientUncheckedCreateWithoutRecipeInputObjectSchema,
          ),
          z
            .lazy(
              () =>
                RecipeIngredientUncheckedCreateWithoutRecipeInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(
            () => RecipeIngredientCreateOrConnectWithoutRecipeInputObjectSchema,
          ),
          z
            .lazy(
              () =>
                RecipeIngredientCreateOrConnectWithoutRecipeInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => RecipeIngredientCreateManyRecipeInputEnvelopeObjectSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => RecipeIngredientWhereUniqueInputObjectSchema),
          z.lazy(() => RecipeIngredientWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
    })
    .strict();
export const RecipeIngredientCreateNestedManyWithoutRecipeInputObjectSchema: z.ZodType<Prisma.RecipeIngredientCreateNestedManyWithoutRecipeInput> =
  makeSchema() as unknown as z.ZodType<Prisma.RecipeIngredientCreateNestedManyWithoutRecipeInput>;
export const RecipeIngredientCreateNestedManyWithoutRecipeInputObjectZodSchema =
  makeSchema();
