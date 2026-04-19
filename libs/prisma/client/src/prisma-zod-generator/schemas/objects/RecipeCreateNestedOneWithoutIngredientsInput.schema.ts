import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RecipeCreateWithoutIngredientsInputObjectSchema as RecipeCreateWithoutIngredientsInputObjectSchema } from './RecipeCreateWithoutIngredientsInput.schema';
import { RecipeUncheckedCreateWithoutIngredientsInputObjectSchema as RecipeUncheckedCreateWithoutIngredientsInputObjectSchema } from './RecipeUncheckedCreateWithoutIngredientsInput.schema';
import { RecipeCreateOrConnectWithoutIngredientsInputObjectSchema as RecipeCreateOrConnectWithoutIngredientsInputObjectSchema } from './RecipeCreateOrConnectWithoutIngredientsInput.schema';
import { RecipeWhereUniqueInputObjectSchema as RecipeWhereUniqueInputObjectSchema } from './RecipeWhereUniqueInput.schema';

const makeSchema = () =>
  z
    .object({
      create: z
        .union([
          z.lazy(() => RecipeCreateWithoutIngredientsInputObjectSchema),
          z.lazy(
            () => RecipeUncheckedCreateWithoutIngredientsInputObjectSchema,
          ),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => RecipeCreateOrConnectWithoutIngredientsInputObjectSchema)
        .optional(),
      connect: z.lazy(() => RecipeWhereUniqueInputObjectSchema).optional(),
    })
    .strict();
export const RecipeCreateNestedOneWithoutIngredientsInputObjectSchema: z.ZodType<Prisma.RecipeCreateNestedOneWithoutIngredientsInput> =
  makeSchema() as unknown as z.ZodType<Prisma.RecipeCreateNestedOneWithoutIngredientsInput>;
export const RecipeCreateNestedOneWithoutIngredientsInputObjectZodSchema =
  makeSchema();
