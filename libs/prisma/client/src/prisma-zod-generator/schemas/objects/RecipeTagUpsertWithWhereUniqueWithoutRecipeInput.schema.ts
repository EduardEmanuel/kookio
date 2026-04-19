import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RecipeTagWhereUniqueInputObjectSchema as RecipeTagWhereUniqueInputObjectSchema } from './RecipeTagWhereUniqueInput.schema';
import { RecipeTagUpdateWithoutRecipeInputObjectSchema as RecipeTagUpdateWithoutRecipeInputObjectSchema } from './RecipeTagUpdateWithoutRecipeInput.schema';
import { RecipeTagUncheckedUpdateWithoutRecipeInputObjectSchema as RecipeTagUncheckedUpdateWithoutRecipeInputObjectSchema } from './RecipeTagUncheckedUpdateWithoutRecipeInput.schema';
import { RecipeTagCreateWithoutRecipeInputObjectSchema as RecipeTagCreateWithoutRecipeInputObjectSchema } from './RecipeTagCreateWithoutRecipeInput.schema';
import { RecipeTagUncheckedCreateWithoutRecipeInputObjectSchema as RecipeTagUncheckedCreateWithoutRecipeInputObjectSchema } from './RecipeTagUncheckedCreateWithoutRecipeInput.schema';

const makeSchema = () =>
  z
    .object({
      where: z.lazy(() => RecipeTagWhereUniqueInputObjectSchema),
      update: z.union([
        z.lazy(() => RecipeTagUpdateWithoutRecipeInputObjectSchema),
        z.lazy(() => RecipeTagUncheckedUpdateWithoutRecipeInputObjectSchema),
      ]),
      create: z.union([
        z.lazy(() => RecipeTagCreateWithoutRecipeInputObjectSchema),
        z.lazy(() => RecipeTagUncheckedCreateWithoutRecipeInputObjectSchema),
      ]),
    })
    .strict();
export const RecipeTagUpsertWithWhereUniqueWithoutRecipeInputObjectSchema: z.ZodType<Prisma.RecipeTagUpsertWithWhereUniqueWithoutRecipeInput> =
  makeSchema() as unknown as z.ZodType<Prisma.RecipeTagUpsertWithWhereUniqueWithoutRecipeInput>;
export const RecipeTagUpsertWithWhereUniqueWithoutRecipeInputObjectZodSchema =
  makeSchema();
