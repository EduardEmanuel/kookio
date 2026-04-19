import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RecipeIngredientWhereUniqueInputObjectSchema as RecipeIngredientWhereUniqueInputObjectSchema } from './RecipeIngredientWhereUniqueInput.schema';
import { RecipeIngredientCreateWithoutRecipeInputObjectSchema as RecipeIngredientCreateWithoutRecipeInputObjectSchema } from './RecipeIngredientCreateWithoutRecipeInput.schema';
import { RecipeIngredientUncheckedCreateWithoutRecipeInputObjectSchema as RecipeIngredientUncheckedCreateWithoutRecipeInputObjectSchema } from './RecipeIngredientUncheckedCreateWithoutRecipeInput.schema';

const makeSchema = () =>
  z
    .object({
      where: z.lazy(() => RecipeIngredientWhereUniqueInputObjectSchema),
      create: z.union([
        z.lazy(() => RecipeIngredientCreateWithoutRecipeInputObjectSchema),
        z.lazy(
          () => RecipeIngredientUncheckedCreateWithoutRecipeInputObjectSchema,
        ),
      ]),
    })
    .strict();
export const RecipeIngredientCreateOrConnectWithoutRecipeInputObjectSchema: z.ZodType<Prisma.RecipeIngredientCreateOrConnectWithoutRecipeInput> =
  makeSchema() as unknown as z.ZodType<Prisma.RecipeIngredientCreateOrConnectWithoutRecipeInput>;
export const RecipeIngredientCreateOrConnectWithoutRecipeInputObjectZodSchema =
  makeSchema();
