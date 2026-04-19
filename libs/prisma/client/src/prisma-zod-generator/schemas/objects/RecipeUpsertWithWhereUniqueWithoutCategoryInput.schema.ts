import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RecipeWhereUniqueInputObjectSchema as RecipeWhereUniqueInputObjectSchema } from './RecipeWhereUniqueInput.schema';
import { RecipeUpdateWithoutCategoryInputObjectSchema as RecipeUpdateWithoutCategoryInputObjectSchema } from './RecipeUpdateWithoutCategoryInput.schema';
import { RecipeUncheckedUpdateWithoutCategoryInputObjectSchema as RecipeUncheckedUpdateWithoutCategoryInputObjectSchema } from './RecipeUncheckedUpdateWithoutCategoryInput.schema';
import { RecipeCreateWithoutCategoryInputObjectSchema as RecipeCreateWithoutCategoryInputObjectSchema } from './RecipeCreateWithoutCategoryInput.schema';
import { RecipeUncheckedCreateWithoutCategoryInputObjectSchema as RecipeUncheckedCreateWithoutCategoryInputObjectSchema } from './RecipeUncheckedCreateWithoutCategoryInput.schema';

const makeSchema = () =>
  z
    .object({
      where: z.lazy(() => RecipeWhereUniqueInputObjectSchema),
      update: z.union([
        z.lazy(() => RecipeUpdateWithoutCategoryInputObjectSchema),
        z.lazy(() => RecipeUncheckedUpdateWithoutCategoryInputObjectSchema),
      ]),
      create: z.union([
        z.lazy(() => RecipeCreateWithoutCategoryInputObjectSchema),
        z.lazy(() => RecipeUncheckedCreateWithoutCategoryInputObjectSchema),
      ]),
    })
    .strict();
export const RecipeUpsertWithWhereUniqueWithoutCategoryInputObjectSchema: z.ZodType<Prisma.RecipeUpsertWithWhereUniqueWithoutCategoryInput> =
  makeSchema() as unknown as z.ZodType<Prisma.RecipeUpsertWithWhereUniqueWithoutCategoryInput>;
export const RecipeUpsertWithWhereUniqueWithoutCategoryInputObjectZodSchema =
  makeSchema();
