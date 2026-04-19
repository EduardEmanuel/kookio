import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RecipeCollectionWhereUniqueInputObjectSchema as RecipeCollectionWhereUniqueInputObjectSchema } from './RecipeCollectionWhereUniqueInput.schema';
import { RecipeCollectionCreateWithoutRecipesInputObjectSchema as RecipeCollectionCreateWithoutRecipesInputObjectSchema } from './RecipeCollectionCreateWithoutRecipesInput.schema';
import { RecipeCollectionUncheckedCreateWithoutRecipesInputObjectSchema as RecipeCollectionUncheckedCreateWithoutRecipesInputObjectSchema } from './RecipeCollectionUncheckedCreateWithoutRecipesInput.schema';

const makeSchema = () =>
  z
    .object({
      where: z.lazy(() => RecipeCollectionWhereUniqueInputObjectSchema),
      create: z.union([
        z.lazy(() => RecipeCollectionCreateWithoutRecipesInputObjectSchema),
        z.lazy(
          () => RecipeCollectionUncheckedCreateWithoutRecipesInputObjectSchema,
        ),
      ]),
    })
    .strict();
export const RecipeCollectionCreateOrConnectWithoutRecipesInputObjectSchema: z.ZodType<Prisma.RecipeCollectionCreateOrConnectWithoutRecipesInput> =
  makeSchema() as unknown as z.ZodType<Prisma.RecipeCollectionCreateOrConnectWithoutRecipesInput>;
export const RecipeCollectionCreateOrConnectWithoutRecipesInputObjectZodSchema =
  makeSchema();
