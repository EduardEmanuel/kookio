import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RecipeWhereUniqueInputObjectSchema as RecipeWhereUniqueInputObjectSchema } from './RecipeWhereUniqueInput.schema';
import { RecipeCreateWithoutIngredientsInputObjectSchema as RecipeCreateWithoutIngredientsInputObjectSchema } from './RecipeCreateWithoutIngredientsInput.schema';
import { RecipeUncheckedCreateWithoutIngredientsInputObjectSchema as RecipeUncheckedCreateWithoutIngredientsInputObjectSchema } from './RecipeUncheckedCreateWithoutIngredientsInput.schema';

const makeSchema = () =>
  z
    .object({
      where: z.lazy(() => RecipeWhereUniqueInputObjectSchema),
      create: z.union([
        z.lazy(() => RecipeCreateWithoutIngredientsInputObjectSchema),
        z.lazy(() => RecipeUncheckedCreateWithoutIngredientsInputObjectSchema),
      ]),
    })
    .strict();
export const RecipeCreateOrConnectWithoutIngredientsInputObjectSchema: z.ZodType<Prisma.RecipeCreateOrConnectWithoutIngredientsInput> =
  makeSchema() as unknown as z.ZodType<Prisma.RecipeCreateOrConnectWithoutIngredientsInput>;
export const RecipeCreateOrConnectWithoutIngredientsInputObjectZodSchema =
  makeSchema();
