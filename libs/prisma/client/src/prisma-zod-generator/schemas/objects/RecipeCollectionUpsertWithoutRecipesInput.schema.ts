import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RecipeCollectionUpdateWithoutRecipesInputObjectSchema as RecipeCollectionUpdateWithoutRecipesInputObjectSchema } from './RecipeCollectionUpdateWithoutRecipesInput.schema';
import { RecipeCollectionUncheckedUpdateWithoutRecipesInputObjectSchema as RecipeCollectionUncheckedUpdateWithoutRecipesInputObjectSchema } from './RecipeCollectionUncheckedUpdateWithoutRecipesInput.schema';
import { RecipeCollectionCreateWithoutRecipesInputObjectSchema as RecipeCollectionCreateWithoutRecipesInputObjectSchema } from './RecipeCollectionCreateWithoutRecipesInput.schema';
import { RecipeCollectionUncheckedCreateWithoutRecipesInputObjectSchema as RecipeCollectionUncheckedCreateWithoutRecipesInputObjectSchema } from './RecipeCollectionUncheckedCreateWithoutRecipesInput.schema';
import { RecipeCollectionWhereInputObjectSchema as RecipeCollectionWhereInputObjectSchema } from './RecipeCollectionWhereInput.schema';

const makeSchema = () =>
  z
    .object({
      update: z.union([
        z.lazy(() => RecipeCollectionUpdateWithoutRecipesInputObjectSchema),
        z.lazy(
          () => RecipeCollectionUncheckedUpdateWithoutRecipesInputObjectSchema,
        ),
      ]),
      create: z.union([
        z.lazy(() => RecipeCollectionCreateWithoutRecipesInputObjectSchema),
        z.lazy(
          () => RecipeCollectionUncheckedCreateWithoutRecipesInputObjectSchema,
        ),
      ]),
      where: z.lazy(() => RecipeCollectionWhereInputObjectSchema).optional(),
    })
    .strict();
export const RecipeCollectionUpsertWithoutRecipesInputObjectSchema: z.ZodType<Prisma.RecipeCollectionUpsertWithoutRecipesInput> =
  makeSchema() as unknown as z.ZodType<Prisma.RecipeCollectionUpsertWithoutRecipesInput>;
export const RecipeCollectionUpsertWithoutRecipesInputObjectZodSchema =
  makeSchema();
