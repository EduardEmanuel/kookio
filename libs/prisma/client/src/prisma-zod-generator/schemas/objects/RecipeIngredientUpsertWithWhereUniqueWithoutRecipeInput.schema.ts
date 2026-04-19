import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RecipeIngredientWhereUniqueInputObjectSchema as RecipeIngredientWhereUniqueInputObjectSchema } from './RecipeIngredientWhereUniqueInput.schema';
import { RecipeIngredientUpdateWithoutRecipeInputObjectSchema as RecipeIngredientUpdateWithoutRecipeInputObjectSchema } from './RecipeIngredientUpdateWithoutRecipeInput.schema';
import { RecipeIngredientUncheckedUpdateWithoutRecipeInputObjectSchema as RecipeIngredientUncheckedUpdateWithoutRecipeInputObjectSchema } from './RecipeIngredientUncheckedUpdateWithoutRecipeInput.schema';
import { RecipeIngredientCreateWithoutRecipeInputObjectSchema as RecipeIngredientCreateWithoutRecipeInputObjectSchema } from './RecipeIngredientCreateWithoutRecipeInput.schema';
import { RecipeIngredientUncheckedCreateWithoutRecipeInputObjectSchema as RecipeIngredientUncheckedCreateWithoutRecipeInputObjectSchema } from './RecipeIngredientUncheckedCreateWithoutRecipeInput.schema';

const makeSchema = () =>
  z
    .object({
      where: z.lazy(() => RecipeIngredientWhereUniqueInputObjectSchema),
      update: z.union([
        z.lazy(() => RecipeIngredientUpdateWithoutRecipeInputObjectSchema),
        z.lazy(
          () => RecipeIngredientUncheckedUpdateWithoutRecipeInputObjectSchema,
        ),
      ]),
      create: z.union([
        z.lazy(() => RecipeIngredientCreateWithoutRecipeInputObjectSchema),
        z.lazy(
          () => RecipeIngredientUncheckedCreateWithoutRecipeInputObjectSchema,
        ),
      ]),
    })
    .strict();
export const RecipeIngredientUpsertWithWhereUniqueWithoutRecipeInputObjectSchema: z.ZodType<Prisma.RecipeIngredientUpsertWithWhereUniqueWithoutRecipeInput> =
  makeSchema() as unknown as z.ZodType<Prisma.RecipeIngredientUpsertWithWhereUniqueWithoutRecipeInput>;
export const RecipeIngredientUpsertWithWhereUniqueWithoutRecipeInputObjectZodSchema =
  makeSchema();
