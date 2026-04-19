import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RecipeTagWhereUniqueInputObjectSchema as RecipeTagWhereUniqueInputObjectSchema } from './RecipeTagWhereUniqueInput.schema';
import { RecipeTagUpdateWithoutRecipeInputObjectSchema as RecipeTagUpdateWithoutRecipeInputObjectSchema } from './RecipeTagUpdateWithoutRecipeInput.schema';
import { RecipeTagUncheckedUpdateWithoutRecipeInputObjectSchema as RecipeTagUncheckedUpdateWithoutRecipeInputObjectSchema } from './RecipeTagUncheckedUpdateWithoutRecipeInput.schema';

const makeSchema = () =>
  z
    .object({
      where: z.lazy(() => RecipeTagWhereUniqueInputObjectSchema),
      data: z.union([
        z.lazy(() => RecipeTagUpdateWithoutRecipeInputObjectSchema),
        z.lazy(() => RecipeTagUncheckedUpdateWithoutRecipeInputObjectSchema),
      ]),
    })
    .strict();
export const RecipeTagUpdateWithWhereUniqueWithoutRecipeInputObjectSchema: z.ZodType<Prisma.RecipeTagUpdateWithWhereUniqueWithoutRecipeInput> =
  makeSchema() as unknown as z.ZodType<Prisma.RecipeTagUpdateWithWhereUniqueWithoutRecipeInput>;
export const RecipeTagUpdateWithWhereUniqueWithoutRecipeInputObjectZodSchema =
  makeSchema();
