import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RecipeCreateWithoutAuthorInputObjectSchema as RecipeCreateWithoutAuthorInputObjectSchema } from './RecipeCreateWithoutAuthorInput.schema';
import { RecipeUncheckedCreateWithoutAuthorInputObjectSchema as RecipeUncheckedCreateWithoutAuthorInputObjectSchema } from './RecipeUncheckedCreateWithoutAuthorInput.schema';
import { RecipeCreateOrConnectWithoutAuthorInputObjectSchema as RecipeCreateOrConnectWithoutAuthorInputObjectSchema } from './RecipeCreateOrConnectWithoutAuthorInput.schema';
import { RecipeCreateManyAuthorInputEnvelopeObjectSchema as RecipeCreateManyAuthorInputEnvelopeObjectSchema } from './RecipeCreateManyAuthorInputEnvelope.schema';
import { RecipeWhereUniqueInputObjectSchema as RecipeWhereUniqueInputObjectSchema } from './RecipeWhereUniqueInput.schema';

const makeSchema = () =>
  z
    .object({
      create: z
        .union([
          z.lazy(() => RecipeCreateWithoutAuthorInputObjectSchema),
          z.lazy(() => RecipeCreateWithoutAuthorInputObjectSchema).array(),
          z.lazy(() => RecipeUncheckedCreateWithoutAuthorInputObjectSchema),
          z
            .lazy(() => RecipeUncheckedCreateWithoutAuthorInputObjectSchema)
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => RecipeCreateOrConnectWithoutAuthorInputObjectSchema),
          z
            .lazy(() => RecipeCreateOrConnectWithoutAuthorInputObjectSchema)
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => RecipeCreateManyAuthorInputEnvelopeObjectSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => RecipeWhereUniqueInputObjectSchema),
          z.lazy(() => RecipeWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
    })
    .strict();
export const RecipeCreateNestedManyWithoutAuthorInputObjectSchema: z.ZodType<Prisma.RecipeCreateNestedManyWithoutAuthorInput> =
  makeSchema() as unknown as z.ZodType<Prisma.RecipeCreateNestedManyWithoutAuthorInput>;
export const RecipeCreateNestedManyWithoutAuthorInputObjectZodSchema =
  makeSchema();
