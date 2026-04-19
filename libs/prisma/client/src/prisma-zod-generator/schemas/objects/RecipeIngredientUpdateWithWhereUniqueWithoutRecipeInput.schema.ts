import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RecipeIngredientWhereUniqueInputObjectSchema as RecipeIngredientWhereUniqueInputObjectSchema } from './RecipeIngredientWhereUniqueInput.schema';
import { RecipeIngredientUpdateWithoutRecipeInputObjectSchema as RecipeIngredientUpdateWithoutRecipeInputObjectSchema } from './RecipeIngredientUpdateWithoutRecipeInput.schema';
import { RecipeIngredientUncheckedUpdateWithoutRecipeInputObjectSchema as RecipeIngredientUncheckedUpdateWithoutRecipeInputObjectSchema } from './RecipeIngredientUncheckedUpdateWithoutRecipeInput.schema';

const makeSchema = () =>
  z
    .object({
      where: z.lazy(() => RecipeIngredientWhereUniqueInputObjectSchema),
      data: z.union([
        z.lazy(() => RecipeIngredientUpdateWithoutRecipeInputObjectSchema),
        z.lazy(
          () => RecipeIngredientUncheckedUpdateWithoutRecipeInputObjectSchema,
        ),
      ]),
    })
    .strict();
export const RecipeIngredientUpdateWithWhereUniqueWithoutRecipeInputObjectSchema: z.ZodType<Prisma.RecipeIngredientUpdateWithWhereUniqueWithoutRecipeInput> =
  makeSchema() as unknown as z.ZodType<Prisma.RecipeIngredientUpdateWithWhereUniqueWithoutRecipeInput>;
export const RecipeIngredientUpdateWithWhereUniqueWithoutRecipeInputObjectZodSchema =
  makeSchema();
