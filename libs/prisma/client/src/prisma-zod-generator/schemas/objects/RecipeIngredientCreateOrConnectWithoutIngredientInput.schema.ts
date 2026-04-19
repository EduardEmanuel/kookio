import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RecipeIngredientWhereUniqueInputObjectSchema as RecipeIngredientWhereUniqueInputObjectSchema } from './RecipeIngredientWhereUniqueInput.schema';
import { RecipeIngredientCreateWithoutIngredientInputObjectSchema as RecipeIngredientCreateWithoutIngredientInputObjectSchema } from './RecipeIngredientCreateWithoutIngredientInput.schema';
import { RecipeIngredientUncheckedCreateWithoutIngredientInputObjectSchema as RecipeIngredientUncheckedCreateWithoutIngredientInputObjectSchema } from './RecipeIngredientUncheckedCreateWithoutIngredientInput.schema';

const makeSchema = () =>
  z
    .object({
      where: z.lazy(() => RecipeIngredientWhereUniqueInputObjectSchema),
      create: z.union([
        z.lazy(() => RecipeIngredientCreateWithoutIngredientInputObjectSchema),
        z.lazy(
          () =>
            RecipeIngredientUncheckedCreateWithoutIngredientInputObjectSchema,
        ),
      ]),
    })
    .strict();
export const RecipeIngredientCreateOrConnectWithoutIngredientInputObjectSchema: z.ZodType<Prisma.RecipeIngredientCreateOrConnectWithoutIngredientInput> =
  makeSchema() as unknown as z.ZodType<Prisma.RecipeIngredientCreateOrConnectWithoutIngredientInput>;
export const RecipeIngredientCreateOrConnectWithoutIngredientInputObjectZodSchema =
  makeSchema();
