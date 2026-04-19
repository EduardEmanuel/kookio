import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RecipeUpdateWithoutIngredientsInputObjectSchema as RecipeUpdateWithoutIngredientsInputObjectSchema } from './RecipeUpdateWithoutIngredientsInput.schema';
import { RecipeUncheckedUpdateWithoutIngredientsInputObjectSchema as RecipeUncheckedUpdateWithoutIngredientsInputObjectSchema } from './RecipeUncheckedUpdateWithoutIngredientsInput.schema';
import { RecipeCreateWithoutIngredientsInputObjectSchema as RecipeCreateWithoutIngredientsInputObjectSchema } from './RecipeCreateWithoutIngredientsInput.schema';
import { RecipeUncheckedCreateWithoutIngredientsInputObjectSchema as RecipeUncheckedCreateWithoutIngredientsInputObjectSchema } from './RecipeUncheckedCreateWithoutIngredientsInput.schema';
import { RecipeWhereInputObjectSchema as RecipeWhereInputObjectSchema } from './RecipeWhereInput.schema';

const makeSchema = () =>
  z
    .object({
      update: z.union([
        z.lazy(() => RecipeUpdateWithoutIngredientsInputObjectSchema),
        z.lazy(() => RecipeUncheckedUpdateWithoutIngredientsInputObjectSchema),
      ]),
      create: z.union([
        z.lazy(() => RecipeCreateWithoutIngredientsInputObjectSchema),
        z.lazy(() => RecipeUncheckedCreateWithoutIngredientsInputObjectSchema),
      ]),
      where: z.lazy(() => RecipeWhereInputObjectSchema).optional(),
    })
    .strict();
export const RecipeUpsertWithoutIngredientsInputObjectSchema: z.ZodType<Prisma.RecipeUpsertWithoutIngredientsInput> =
  makeSchema() as unknown as z.ZodType<Prisma.RecipeUpsertWithoutIngredientsInput>;
export const RecipeUpsertWithoutIngredientsInputObjectZodSchema = makeSchema();
