import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RecipeIngredientWhereUniqueInputObjectSchema as RecipeIngredientWhereUniqueInputObjectSchema } from './RecipeIngredientWhereUniqueInput.schema';
import { RecipeIngredientUpdateWithoutIngredientInputObjectSchema as RecipeIngredientUpdateWithoutIngredientInputObjectSchema } from './RecipeIngredientUpdateWithoutIngredientInput.schema';
import { RecipeIngredientUncheckedUpdateWithoutIngredientInputObjectSchema as RecipeIngredientUncheckedUpdateWithoutIngredientInputObjectSchema } from './RecipeIngredientUncheckedUpdateWithoutIngredientInput.schema';
import { RecipeIngredientCreateWithoutIngredientInputObjectSchema as RecipeIngredientCreateWithoutIngredientInputObjectSchema } from './RecipeIngredientCreateWithoutIngredientInput.schema';
import { RecipeIngredientUncheckedCreateWithoutIngredientInputObjectSchema as RecipeIngredientUncheckedCreateWithoutIngredientInputObjectSchema } from './RecipeIngredientUncheckedCreateWithoutIngredientInput.schema';

const makeSchema = () =>
  z
    .object({
      where: z.lazy(() => RecipeIngredientWhereUniqueInputObjectSchema),
      update: z.union([
        z.lazy(() => RecipeIngredientUpdateWithoutIngredientInputObjectSchema),
        z.lazy(
          () =>
            RecipeIngredientUncheckedUpdateWithoutIngredientInputObjectSchema,
        ),
      ]),
      create: z.union([
        z.lazy(() => RecipeIngredientCreateWithoutIngredientInputObjectSchema),
        z.lazy(
          () =>
            RecipeIngredientUncheckedCreateWithoutIngredientInputObjectSchema,
        ),
      ]),
    })
    .strict();
export const RecipeIngredientUpsertWithWhereUniqueWithoutIngredientInputObjectSchema: z.ZodType<Prisma.RecipeIngredientUpsertWithWhereUniqueWithoutIngredientInput> =
  makeSchema() as unknown as z.ZodType<Prisma.RecipeIngredientUpsertWithWhereUniqueWithoutIngredientInput>;
export const RecipeIngredientUpsertWithWhereUniqueWithoutIngredientInputObjectZodSchema =
  makeSchema();
