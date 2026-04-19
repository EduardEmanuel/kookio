import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RecipeIngredientCreateWithoutIngredientInputObjectSchema as RecipeIngredientCreateWithoutIngredientInputObjectSchema } from './RecipeIngredientCreateWithoutIngredientInput.schema';
import { RecipeIngredientUncheckedCreateWithoutIngredientInputObjectSchema as RecipeIngredientUncheckedCreateWithoutIngredientInputObjectSchema } from './RecipeIngredientUncheckedCreateWithoutIngredientInput.schema';
import { RecipeIngredientCreateOrConnectWithoutIngredientInputObjectSchema as RecipeIngredientCreateOrConnectWithoutIngredientInputObjectSchema } from './RecipeIngredientCreateOrConnectWithoutIngredientInput.schema';
import { RecipeIngredientCreateManyIngredientInputEnvelopeObjectSchema as RecipeIngredientCreateManyIngredientInputEnvelopeObjectSchema } from './RecipeIngredientCreateManyIngredientInputEnvelope.schema';
import { RecipeIngredientWhereUniqueInputObjectSchema as RecipeIngredientWhereUniqueInputObjectSchema } from './RecipeIngredientWhereUniqueInput.schema';

const makeSchema = () =>
  z
    .object({
      create: z
        .union([
          z.lazy(
            () => RecipeIngredientCreateWithoutIngredientInputObjectSchema,
          ),
          z
            .lazy(
              () => RecipeIngredientCreateWithoutIngredientInputObjectSchema,
            )
            .array(),
          z.lazy(
            () =>
              RecipeIngredientUncheckedCreateWithoutIngredientInputObjectSchema,
          ),
          z
            .lazy(
              () =>
                RecipeIngredientUncheckedCreateWithoutIngredientInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(
            () =>
              RecipeIngredientCreateOrConnectWithoutIngredientInputObjectSchema,
          ),
          z
            .lazy(
              () =>
                RecipeIngredientCreateOrConnectWithoutIngredientInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(
          () => RecipeIngredientCreateManyIngredientInputEnvelopeObjectSchema,
        )
        .optional(),
      connect: z
        .union([
          z.lazy(() => RecipeIngredientWhereUniqueInputObjectSchema),
          z.lazy(() => RecipeIngredientWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
    })
    .strict();
export const RecipeIngredientUncheckedCreateNestedManyWithoutIngredientInputObjectSchema: z.ZodType<Prisma.RecipeIngredientUncheckedCreateNestedManyWithoutIngredientInput> =
  makeSchema() as unknown as z.ZodType<Prisma.RecipeIngredientUncheckedCreateNestedManyWithoutIngredientInput>;
export const RecipeIngredientUncheckedCreateNestedManyWithoutIngredientInputObjectZodSchema =
  makeSchema();
