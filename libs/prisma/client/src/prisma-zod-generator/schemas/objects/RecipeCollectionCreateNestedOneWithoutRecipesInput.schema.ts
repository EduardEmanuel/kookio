import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RecipeCollectionCreateWithoutRecipesInputObjectSchema as RecipeCollectionCreateWithoutRecipesInputObjectSchema } from './RecipeCollectionCreateWithoutRecipesInput.schema';
import { RecipeCollectionUncheckedCreateWithoutRecipesInputObjectSchema as RecipeCollectionUncheckedCreateWithoutRecipesInputObjectSchema } from './RecipeCollectionUncheckedCreateWithoutRecipesInput.schema';
import { RecipeCollectionCreateOrConnectWithoutRecipesInputObjectSchema as RecipeCollectionCreateOrConnectWithoutRecipesInputObjectSchema } from './RecipeCollectionCreateOrConnectWithoutRecipesInput.schema';
import { RecipeCollectionWhereUniqueInputObjectSchema as RecipeCollectionWhereUniqueInputObjectSchema } from './RecipeCollectionWhereUniqueInput.schema';

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
      connect: z
        .lazy(() => RecipeCollectionWhereUniqueInputObjectSchema)
        .optional(),
    })
    .strict();
export const RecipeCollectionCreateNestedOneWithoutRecipesInputObjectSchema: z.ZodType<Prisma.RecipeCollectionCreateNestedOneWithoutRecipesInput> =
  makeSchema() as unknown as z.ZodType<Prisma.RecipeCollectionCreateNestedOneWithoutRecipesInput>;
export const RecipeCollectionCreateNestedOneWithoutRecipesInputObjectZodSchema =
  makeSchema();
