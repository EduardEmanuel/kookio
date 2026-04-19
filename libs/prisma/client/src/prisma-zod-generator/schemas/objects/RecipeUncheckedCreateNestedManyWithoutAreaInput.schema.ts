import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RecipeCreateWithoutAreaInputObjectSchema as RecipeCreateWithoutAreaInputObjectSchema } from './RecipeCreateWithoutAreaInput.schema';
import { RecipeUncheckedCreateWithoutAreaInputObjectSchema as RecipeUncheckedCreateWithoutAreaInputObjectSchema } from './RecipeUncheckedCreateWithoutAreaInput.schema';
import { RecipeCreateOrConnectWithoutAreaInputObjectSchema as RecipeCreateOrConnectWithoutAreaInputObjectSchema } from './RecipeCreateOrConnectWithoutAreaInput.schema';
import { RecipeCreateManyAreaInputEnvelopeObjectSchema as RecipeCreateManyAreaInputEnvelopeObjectSchema } from './RecipeCreateManyAreaInputEnvelope.schema';
import { RecipeWhereUniqueInputObjectSchema as RecipeWhereUniqueInputObjectSchema } from './RecipeWhereUniqueInput.schema';

const makeSchema = () =>
  z
    .object({
      create: z
        .union([
          z.lazy(() => RecipeCreateWithoutAreaInputObjectSchema),
          z.lazy(() => RecipeCreateWithoutAreaInputObjectSchema).array(),
          z.lazy(() => RecipeUncheckedCreateWithoutAreaInputObjectSchema),
          z
            .lazy(() => RecipeUncheckedCreateWithoutAreaInputObjectSchema)
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => RecipeCreateOrConnectWithoutAreaInputObjectSchema),
          z
            .lazy(() => RecipeCreateOrConnectWithoutAreaInputObjectSchema)
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => RecipeCreateManyAreaInputEnvelopeObjectSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => RecipeWhereUniqueInputObjectSchema),
          z.lazy(() => RecipeWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
    })
    .strict();
export const RecipeUncheckedCreateNestedManyWithoutAreaInputObjectSchema: z.ZodType<Prisma.RecipeUncheckedCreateNestedManyWithoutAreaInput> =
  makeSchema() as unknown as z.ZodType<Prisma.RecipeUncheckedCreateNestedManyWithoutAreaInput>;
export const RecipeUncheckedCreateNestedManyWithoutAreaInputObjectZodSchema =
  makeSchema();
