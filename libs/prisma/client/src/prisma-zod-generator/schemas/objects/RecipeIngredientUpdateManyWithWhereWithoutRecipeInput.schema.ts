import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RecipeIngredientScalarWhereInputObjectSchema as RecipeIngredientScalarWhereInputObjectSchema } from './RecipeIngredientScalarWhereInput.schema';
import { RecipeIngredientUpdateManyMutationInputObjectSchema as RecipeIngredientUpdateManyMutationInputObjectSchema } from './RecipeIngredientUpdateManyMutationInput.schema';
import { RecipeIngredientUncheckedUpdateManyWithoutRecipeInputObjectSchema as RecipeIngredientUncheckedUpdateManyWithoutRecipeInputObjectSchema } from './RecipeIngredientUncheckedUpdateManyWithoutRecipeInput.schema';

const makeSchema = () =>
  z
    .object({
      where: z.lazy(() => RecipeIngredientScalarWhereInputObjectSchema),
      data: z.union([
        z.lazy(() => RecipeIngredientUpdateManyMutationInputObjectSchema),
        z.lazy(
          () =>
            RecipeIngredientUncheckedUpdateManyWithoutRecipeInputObjectSchema,
        ),
      ]),
    })
    .strict();
export const RecipeIngredientUpdateManyWithWhereWithoutRecipeInputObjectSchema: z.ZodType<Prisma.RecipeIngredientUpdateManyWithWhereWithoutRecipeInput> =
  makeSchema() as unknown as z.ZodType<Prisma.RecipeIngredientUpdateManyWithWhereWithoutRecipeInput>;
export const RecipeIngredientUpdateManyWithWhereWithoutRecipeInputObjectZodSchema =
  makeSchema();
