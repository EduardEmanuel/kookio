import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RecipeWhereUniqueInputObjectSchema as RecipeWhereUniqueInputObjectSchema } from './RecipeWhereUniqueInput.schema';
import { RecipeUpdateWithoutCategoryInputObjectSchema as RecipeUpdateWithoutCategoryInputObjectSchema } from './RecipeUpdateWithoutCategoryInput.schema';
import { RecipeUncheckedUpdateWithoutCategoryInputObjectSchema as RecipeUncheckedUpdateWithoutCategoryInputObjectSchema } from './RecipeUncheckedUpdateWithoutCategoryInput.schema';

const makeSchema = () =>
  z
    .object({
      where: z.lazy(() => RecipeWhereUniqueInputObjectSchema),
      data: z.union([
        z.lazy(() => RecipeUpdateWithoutCategoryInputObjectSchema),
        z.lazy(() => RecipeUncheckedUpdateWithoutCategoryInputObjectSchema),
      ]),
    })
    .strict();
export const RecipeUpdateWithWhereUniqueWithoutCategoryInputObjectSchema: z.ZodType<Prisma.RecipeUpdateWithWhereUniqueWithoutCategoryInput> =
  makeSchema() as unknown as z.ZodType<Prisma.RecipeUpdateWithWhereUniqueWithoutCategoryInput>;
export const RecipeUpdateWithWhereUniqueWithoutCategoryInputObjectZodSchema =
  makeSchema();
