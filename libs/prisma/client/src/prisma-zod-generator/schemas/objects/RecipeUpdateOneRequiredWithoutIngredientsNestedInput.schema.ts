import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RecipeCreateWithoutIngredientsInputObjectSchema as RecipeCreateWithoutIngredientsInputObjectSchema } from './RecipeCreateWithoutIngredientsInput.schema';
import { RecipeUncheckedCreateWithoutIngredientsInputObjectSchema as RecipeUncheckedCreateWithoutIngredientsInputObjectSchema } from './RecipeUncheckedCreateWithoutIngredientsInput.schema';
import { RecipeCreateOrConnectWithoutIngredientsInputObjectSchema as RecipeCreateOrConnectWithoutIngredientsInputObjectSchema } from './RecipeCreateOrConnectWithoutIngredientsInput.schema';
import { RecipeUpsertWithoutIngredientsInputObjectSchema as RecipeUpsertWithoutIngredientsInputObjectSchema } from './RecipeUpsertWithoutIngredientsInput.schema';
import { RecipeWhereUniqueInputObjectSchema as RecipeWhereUniqueInputObjectSchema } from './RecipeWhereUniqueInput.schema';
import { RecipeUpdateToOneWithWhereWithoutIngredientsInputObjectSchema as RecipeUpdateToOneWithWhereWithoutIngredientsInputObjectSchema } from './RecipeUpdateToOneWithWhereWithoutIngredientsInput.schema';
import { RecipeUpdateWithoutIngredientsInputObjectSchema as RecipeUpdateWithoutIngredientsInputObjectSchema } from './RecipeUpdateWithoutIngredientsInput.schema';
import { RecipeUncheckedUpdateWithoutIngredientsInputObjectSchema as RecipeUncheckedUpdateWithoutIngredientsInputObjectSchema } from './RecipeUncheckedUpdateWithoutIngredientsInput.schema';

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
      upsert: z
        .lazy(() => RecipeUpsertWithoutIngredientsInputObjectSchema)
        .optional(),
      connect: z.lazy(() => RecipeWhereUniqueInputObjectSchema).optional(),
      update: z
        .union([
          z.lazy(
            () => RecipeUpdateToOneWithWhereWithoutIngredientsInputObjectSchema,
          ),
          z.lazy(() => RecipeUpdateWithoutIngredientsInputObjectSchema),
          z.lazy(
            () => RecipeUncheckedUpdateWithoutIngredientsInputObjectSchema,
          ),
        ])
        .optional(),
    })
    .strict();
export const RecipeUpdateOneRequiredWithoutIngredientsNestedInputObjectSchema: z.ZodType<Prisma.RecipeUpdateOneRequiredWithoutIngredientsNestedInput> =
  makeSchema() as unknown as z.ZodType<Prisma.RecipeUpdateOneRequiredWithoutIngredientsNestedInput>;
export const RecipeUpdateOneRequiredWithoutIngredientsNestedInputObjectZodSchema =
  makeSchema();
