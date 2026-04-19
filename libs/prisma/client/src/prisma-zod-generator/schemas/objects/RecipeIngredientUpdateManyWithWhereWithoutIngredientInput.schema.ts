import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RecipeIngredientScalarWhereInputObjectSchema as RecipeIngredientScalarWhereInputObjectSchema } from './RecipeIngredientScalarWhereInput.schema';
import { RecipeIngredientUpdateManyMutationInputObjectSchema as RecipeIngredientUpdateManyMutationInputObjectSchema } from './RecipeIngredientUpdateManyMutationInput.schema';
import { RecipeIngredientUncheckedUpdateManyWithoutIngredientInputObjectSchema as RecipeIngredientUncheckedUpdateManyWithoutIngredientInputObjectSchema } from './RecipeIngredientUncheckedUpdateManyWithoutIngredientInput.schema';

const makeSchema = () =>
  z
    .object({
      where: z.lazy(() => RecipeIngredientScalarWhereInputObjectSchema),
      data: z.union([
        z.lazy(() => RecipeIngredientUpdateManyMutationInputObjectSchema),
        z.lazy(
          () =>
            RecipeIngredientUncheckedUpdateManyWithoutIngredientInputObjectSchema,
        ),
      ]),
    })
    .strict();
export const RecipeIngredientUpdateManyWithWhereWithoutIngredientInputObjectSchema: z.ZodType<Prisma.RecipeIngredientUpdateManyWithWhereWithoutIngredientInput> =
  makeSchema() as unknown as z.ZodType<Prisma.RecipeIngredientUpdateManyWithWhereWithoutIngredientInput>;
export const RecipeIngredientUpdateManyWithWhereWithoutIngredientInputObjectZodSchema =
  makeSchema();
