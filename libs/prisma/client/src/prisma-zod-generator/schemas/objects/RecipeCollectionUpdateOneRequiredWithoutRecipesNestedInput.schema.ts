import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RecipeCollectionCreateWithoutRecipesInputObjectSchema as RecipeCollectionCreateWithoutRecipesInputObjectSchema } from './RecipeCollectionCreateWithoutRecipesInput.schema';
import { RecipeCollectionUncheckedCreateWithoutRecipesInputObjectSchema as RecipeCollectionUncheckedCreateWithoutRecipesInputObjectSchema } from './RecipeCollectionUncheckedCreateWithoutRecipesInput.schema';
import { RecipeCollectionCreateOrConnectWithoutRecipesInputObjectSchema as RecipeCollectionCreateOrConnectWithoutRecipesInputObjectSchema } from './RecipeCollectionCreateOrConnectWithoutRecipesInput.schema';
import { RecipeCollectionUpsertWithoutRecipesInputObjectSchema as RecipeCollectionUpsertWithoutRecipesInputObjectSchema } from './RecipeCollectionUpsertWithoutRecipesInput.schema';
import { RecipeCollectionWhereUniqueInputObjectSchema as RecipeCollectionWhereUniqueInputObjectSchema } from './RecipeCollectionWhereUniqueInput.schema';
import { RecipeCollectionUpdateToOneWithWhereWithoutRecipesInputObjectSchema as RecipeCollectionUpdateToOneWithWhereWithoutRecipesInputObjectSchema } from './RecipeCollectionUpdateToOneWithWhereWithoutRecipesInput.schema';
import { RecipeCollectionUpdateWithoutRecipesInputObjectSchema as RecipeCollectionUpdateWithoutRecipesInputObjectSchema } from './RecipeCollectionUpdateWithoutRecipesInput.schema';
import { RecipeCollectionUncheckedUpdateWithoutRecipesInputObjectSchema as RecipeCollectionUncheckedUpdateWithoutRecipesInputObjectSchema } from './RecipeCollectionUncheckedUpdateWithoutRecipesInput.schema';

const makeSchema = () =>
  z
    .object({
      create: z
        .union([
          z.lazy(() => RecipeCollectionCreateWithoutRecipesInputObjectSchema),
          z.lazy(
            () =>
              RecipeCollectionUncheckedCreateWithoutRecipesInputObjectSchema,
          ),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(
          () => RecipeCollectionCreateOrConnectWithoutRecipesInputObjectSchema,
        )
        .optional(),
      upsert: z
        .lazy(() => RecipeCollectionUpsertWithoutRecipesInputObjectSchema)
        .optional(),
      connect: z
        .lazy(() => RecipeCollectionWhereUniqueInputObjectSchema)
        .optional(),
      update: z
        .union([
          z.lazy(
            () =>
              RecipeCollectionUpdateToOneWithWhereWithoutRecipesInputObjectSchema,
          ),
          z.lazy(() => RecipeCollectionUpdateWithoutRecipesInputObjectSchema),
          z.lazy(
            () =>
              RecipeCollectionUncheckedUpdateWithoutRecipesInputObjectSchema,
          ),
        ])
        .optional(),
    })
    .strict();
export const RecipeCollectionUpdateOneRequiredWithoutRecipesNestedInputObjectSchema: z.ZodType<Prisma.RecipeCollectionUpdateOneRequiredWithoutRecipesNestedInput> =
  makeSchema() as unknown as z.ZodType<Prisma.RecipeCollectionUpdateOneRequiredWithoutRecipesNestedInput>;
export const RecipeCollectionUpdateOneRequiredWithoutRecipesNestedInputObjectZodSchema =
  makeSchema();
