import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RecipeWhereUniqueInputObjectSchema as RecipeWhereUniqueInputObjectSchema } from './RecipeWhereUniqueInput.schema';
import { RecipeCreateWithoutTagsInputObjectSchema as RecipeCreateWithoutTagsInputObjectSchema } from './RecipeCreateWithoutTagsInput.schema';
import { RecipeUncheckedCreateWithoutTagsInputObjectSchema as RecipeUncheckedCreateWithoutTagsInputObjectSchema } from './RecipeUncheckedCreateWithoutTagsInput.schema';

const makeSchema = () =>
  z
    .object({
      where: z.lazy(() => RecipeWhereUniqueInputObjectSchema),
      create: z.union([
        z.lazy(() => RecipeCreateWithoutTagsInputObjectSchema),
        z.lazy(() => RecipeUncheckedCreateWithoutTagsInputObjectSchema),
      ]),
    })
    .strict();
export const RecipeCreateOrConnectWithoutTagsInputObjectSchema: z.ZodType<Prisma.RecipeCreateOrConnectWithoutTagsInput> =
  makeSchema() as unknown as z.ZodType<Prisma.RecipeCreateOrConnectWithoutTagsInput>;
export const RecipeCreateOrConnectWithoutTagsInputObjectZodSchema =
  makeSchema();
