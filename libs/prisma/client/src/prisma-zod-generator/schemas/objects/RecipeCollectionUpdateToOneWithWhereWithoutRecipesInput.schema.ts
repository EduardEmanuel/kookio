import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RecipeCollectionWhereInputObjectSchema as RecipeCollectionWhereInputObjectSchema } from './RecipeCollectionWhereInput.schema';
import { RecipeCollectionUpdateWithoutRecipesInputObjectSchema as RecipeCollectionUpdateWithoutRecipesInputObjectSchema } from './RecipeCollectionUpdateWithoutRecipesInput.schema';
import { RecipeCollectionUncheckedUpdateWithoutRecipesInputObjectSchema as RecipeCollectionUncheckedUpdateWithoutRecipesInputObjectSchema } from './RecipeCollectionUncheckedUpdateWithoutRecipesInput.schema';

const makeSchema = () =>
  z
    .object({
      where: z.lazy(() => RecipeCollectionWhereInputObjectSchema).optional(),
      data: z.union([
        z.lazy(() => RecipeCollectionUpdateWithoutRecipesInputObjectSchema),
        z.lazy(
          () => RecipeCollectionUncheckedUpdateWithoutRecipesInputObjectSchema,
        ),
      ]),
    })
    .strict();
export const RecipeCollectionUpdateToOneWithWhereWithoutRecipesInputObjectSchema: z.ZodType<Prisma.RecipeCollectionUpdateToOneWithWhereWithoutRecipesInput> =
  makeSchema() as unknown as z.ZodType<Prisma.RecipeCollectionUpdateToOneWithWhereWithoutRecipesInput>;
export const RecipeCollectionUpdateToOneWithWhereWithoutRecipesInputObjectZodSchema =
  makeSchema();
