import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RecipeIngredientWhereUniqueInputObjectSchema as RecipeIngredientWhereUniqueInputObjectSchema } from './RecipeIngredientWhereUniqueInput.schema';
import { RecipeIngredientUpdateWithoutIngredientInputObjectSchema as RecipeIngredientUpdateWithoutIngredientInputObjectSchema } from './RecipeIngredientUpdateWithoutIngredientInput.schema';
import { RecipeIngredientUncheckedUpdateWithoutIngredientInputObjectSchema as RecipeIngredientUncheckedUpdateWithoutIngredientInputObjectSchema } from './RecipeIngredientUncheckedUpdateWithoutIngredientInput.schema';

const makeSchema = () =>
  z
    .object({
      where: z.lazy(() => RecipeIngredientWhereUniqueInputObjectSchema),
      data: z.union([
        z.lazy(() => RecipeIngredientUpdateWithoutIngredientInputObjectSchema),
        z.lazy(
          () =>
            RecipeIngredientUncheckedUpdateWithoutIngredientInputObjectSchema,
        ),
      ]),
    })
    .strict();
export const RecipeIngredientUpdateWithWhereUniqueWithoutIngredientInputObjectSchema: z.ZodType<Prisma.RecipeIngredientUpdateWithWhereUniqueWithoutIngredientInput> =
  makeSchema() as unknown as z.ZodType<Prisma.RecipeIngredientUpdateWithWhereUniqueWithoutIngredientInput>;
export const RecipeIngredientUpdateWithWhereUniqueWithoutIngredientInputObjectZodSchema =
  makeSchema();
