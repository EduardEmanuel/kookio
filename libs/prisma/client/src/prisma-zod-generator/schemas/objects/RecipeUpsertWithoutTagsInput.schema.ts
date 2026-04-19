import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RecipeUpdateWithoutTagsInputObjectSchema as RecipeUpdateWithoutTagsInputObjectSchema } from './RecipeUpdateWithoutTagsInput.schema';
import { RecipeUncheckedUpdateWithoutTagsInputObjectSchema as RecipeUncheckedUpdateWithoutTagsInputObjectSchema } from './RecipeUncheckedUpdateWithoutTagsInput.schema';
import { RecipeCreateWithoutTagsInputObjectSchema as RecipeCreateWithoutTagsInputObjectSchema } from './RecipeCreateWithoutTagsInput.schema';
import { RecipeUncheckedCreateWithoutTagsInputObjectSchema as RecipeUncheckedCreateWithoutTagsInputObjectSchema } from './RecipeUncheckedCreateWithoutTagsInput.schema';
import { RecipeWhereInputObjectSchema as RecipeWhereInputObjectSchema } from './RecipeWhereInput.schema';

const makeSchema = () =>
  z
    .object({
      update: z.union([
        z.lazy(() => RecipeUpdateWithoutTagsInputObjectSchema),
        z.lazy(() => RecipeUncheckedUpdateWithoutTagsInputObjectSchema),
      ]),
      create: z.union([
        z.lazy(() => RecipeCreateWithoutTagsInputObjectSchema),
        z.lazy(() => RecipeUncheckedCreateWithoutTagsInputObjectSchema),
      ]),
      where: z.lazy(() => RecipeWhereInputObjectSchema).optional(),
    })
    .strict();
export const RecipeUpsertWithoutTagsInputObjectSchema: z.ZodType<Prisma.RecipeUpsertWithoutTagsInput> =
  makeSchema() as unknown as z.ZodType<Prisma.RecipeUpsertWithoutTagsInput>;
export const RecipeUpsertWithoutTagsInputObjectZodSchema = makeSchema();
