import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RecipeCreateWithoutTagsInputObjectSchema as RecipeCreateWithoutTagsInputObjectSchema } from './RecipeCreateWithoutTagsInput.schema';
import { RecipeUncheckedCreateWithoutTagsInputObjectSchema as RecipeUncheckedCreateWithoutTagsInputObjectSchema } from './RecipeUncheckedCreateWithoutTagsInput.schema';
import { RecipeCreateOrConnectWithoutTagsInputObjectSchema as RecipeCreateOrConnectWithoutTagsInputObjectSchema } from './RecipeCreateOrConnectWithoutTagsInput.schema';
import { RecipeWhereUniqueInputObjectSchema as RecipeWhereUniqueInputObjectSchema } from './RecipeWhereUniqueInput.schema';

const makeSchema = () =>
  z
    .object({
      create: z
        .union([
          z.lazy(() => RecipeCreateWithoutTagsInputObjectSchema),
          z.lazy(() => RecipeUncheckedCreateWithoutTagsInputObjectSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => RecipeCreateOrConnectWithoutTagsInputObjectSchema)
        .optional(),
      connect: z.lazy(() => RecipeWhereUniqueInputObjectSchema).optional(),
    })
    .strict();
export const RecipeCreateNestedOneWithoutTagsInputObjectSchema: z.ZodType<Prisma.RecipeCreateNestedOneWithoutTagsInput> =
  makeSchema() as unknown as z.ZodType<Prisma.RecipeCreateNestedOneWithoutTagsInput>;
export const RecipeCreateNestedOneWithoutTagsInputObjectZodSchema =
  makeSchema();
