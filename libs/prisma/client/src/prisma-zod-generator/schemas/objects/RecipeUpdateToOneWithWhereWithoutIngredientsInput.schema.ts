import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RecipeWhereInputObjectSchema as RecipeWhereInputObjectSchema } from './RecipeWhereInput.schema';
import { RecipeUpdateWithoutIngredientsInputObjectSchema as RecipeUpdateWithoutIngredientsInputObjectSchema } from './RecipeUpdateWithoutIngredientsInput.schema';
import { RecipeUncheckedUpdateWithoutIngredientsInputObjectSchema as RecipeUncheckedUpdateWithoutIngredientsInputObjectSchema } from './RecipeUncheckedUpdateWithoutIngredientsInput.schema';

const makeSchema = () =>
  z
    .object({
      where: z.lazy(() => RecipeWhereInputObjectSchema).optional(),
      data: z.union([
        z.lazy(() => RecipeUpdateWithoutIngredientsInputObjectSchema),
        z.lazy(() => RecipeUncheckedUpdateWithoutIngredientsInputObjectSchema),
      ]),
    })
    .strict();
export const RecipeUpdateToOneWithWhereWithoutIngredientsInputObjectSchema: z.ZodType<Prisma.RecipeUpdateToOneWithWhereWithoutIngredientsInput> =
  makeSchema() as unknown as z.ZodType<Prisma.RecipeUpdateToOneWithWhereWithoutIngredientsInput>;
export const RecipeUpdateToOneWithWhereWithoutIngredientsInputObjectZodSchema =
  makeSchema();
