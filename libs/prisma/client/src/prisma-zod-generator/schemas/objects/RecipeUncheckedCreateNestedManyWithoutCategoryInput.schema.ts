import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RecipeCreateWithoutCategoryInputObjectSchema as RecipeCreateWithoutCategoryInputObjectSchema } from './RecipeCreateWithoutCategoryInput.schema';
import { RecipeUncheckedCreateWithoutCategoryInputObjectSchema as RecipeUncheckedCreateWithoutCategoryInputObjectSchema } from './RecipeUncheckedCreateWithoutCategoryInput.schema';
import { RecipeCreateOrConnectWithoutCategoryInputObjectSchema as RecipeCreateOrConnectWithoutCategoryInputObjectSchema } from './RecipeCreateOrConnectWithoutCategoryInput.schema';
import { RecipeCreateManyCategoryInputEnvelopeObjectSchema as RecipeCreateManyCategoryInputEnvelopeObjectSchema } from './RecipeCreateManyCategoryInputEnvelope.schema';
import { RecipeWhereUniqueInputObjectSchema as RecipeWhereUniqueInputObjectSchema } from './RecipeWhereUniqueInput.schema';

const makeSchema = () =>
  z
    .object({
      create: z
        .union([
          z.lazy(() => RecipeCreateWithoutCategoryInputObjectSchema),
          z.lazy(() => RecipeCreateWithoutCategoryInputObjectSchema).array(),
          z.lazy(() => RecipeUncheckedCreateWithoutCategoryInputObjectSchema),
          z
            .lazy(() => RecipeUncheckedCreateWithoutCategoryInputObjectSchema)
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => RecipeCreateOrConnectWithoutCategoryInputObjectSchema),
          z
            .lazy(() => RecipeCreateOrConnectWithoutCategoryInputObjectSchema)
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => RecipeCreateManyCategoryInputEnvelopeObjectSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => RecipeWhereUniqueInputObjectSchema),
          z.lazy(() => RecipeWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
    })
    .strict();
export const RecipeUncheckedCreateNestedManyWithoutCategoryInputObjectSchema: z.ZodType<Prisma.RecipeUncheckedCreateNestedManyWithoutCategoryInput> =
  makeSchema() as unknown as z.ZodType<Prisma.RecipeUncheckedCreateNestedManyWithoutCategoryInput>;
export const RecipeUncheckedCreateNestedManyWithoutCategoryInputObjectZodSchema =
  makeSchema();
